import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

import Student from '@/models/Student'
import { connectToDB } from "@/utils/connecttodb"

const handleAuth=NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
        })
    ],
    callbacks:{
        async signIn({profile,account,user}){
            try {
                await connectToDB();
                if(account.provider==='google'&& profile.email.endsWith('@wrc.edu.np')){
                    const existingStudent=await Student.findOne({email:profile.email})
                    if(!existingStudent){
                        const newStudent = await Student.create({
                            email: profile.email,
                            name: profile.name,
                            profilePicture: profile.picture,
                          });
                          await newStudent.save();
                    }
                    return Promise.resolve({
                        ...user,
                        isEmailValid: true,
                      });
                }else{
                    throw new Error('Invalid email domain. Sign in with an @wrc.edu.np email.');
      
                }
            } catch (error) {
                console.error('Error during sign-in:', error);
                throw new Error(error)
            }

        },
        async session({session}){
               try {
                await connectToDB();
                const sessionStudent=await Student.findOne({email:session.user.email})
                if(sessionStudent){
                    session.user.id=sessionStudent._idtoString();
                }
               } catch (error) {
                console.error('Error retrieving user from the database:', error);
        
               } 
               return session
        }

    }
})

export {handleAuth as GET ,handleAuth as POST}