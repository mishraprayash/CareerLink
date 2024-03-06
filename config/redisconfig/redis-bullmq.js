import { Queue } from "bullmq";
export const emailQueue = new Queue('email-queue', {
    connection: {
        host: process.env.REDIS_HOST,
        port: 12057,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
    }
}
)