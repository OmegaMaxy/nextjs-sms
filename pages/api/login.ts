

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        let body: any = req.body

        if (body == null || Object.keys(body).length == 0) {
            res.status(405).json({ message: 'Something went wrong..', errorMessage: 'Bad request.' })
            return
        }
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password,
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
                staff: true,
                student: true,
            },
        })
        if (user) {
            await prisma.loginAttempt.create({
                data: {
                    userId: user.id
                }
            })
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong..', errorMessage: error })
    }
}