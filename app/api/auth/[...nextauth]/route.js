import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import Student from '@/models/Student'
import connectDB from "@/config/dbconfig/database"

const handleAuth = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET, 
    callbacks: {
        async signIn({ profile, account, user }) {
            try {
                await connectDB()
                if (account.provider === 'google' && profile.email.endsWith('@wrc.edu.np')) {
                    const existingStudent = await Student.findOne({ email: profile.email })
                    if (!existingStudent) {
                        const newStudent = await Student.create({
                            email: profile.email,
                            name: profile.name,
                            profilePicture:{
                                secure_url:profile.picture,
                            }
                        });
                        await newStudent.save();
                    }
                    return Promise.resolve({
                        ...user,
                        isEmailValid: true,
                    });
                } else {
                    throw new Error('Invalid email domain. Sign in with an @wrc.edu.np email.');

                }
            } catch (error) {
                console.error('Error during sign-in:', error);
                throw new Error(error)
            }

        },
        async session({ session,token,user }) {
            try {
                await connectDB()
                const sessionStudent = await Student.findOne({ email: session.user.email })
                if (sessionStudent) {
                    session.user.id = sessionStudent._id.toString();
                    session.user.token = token.accessToken
                }
            } catch (error) {
                console.error('Error retrieving user from the database:', error);

            }
            return session;
        },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token;
        }

    }
})

export { handleAuth as GET, handleAuth as POST ,handleAuth}