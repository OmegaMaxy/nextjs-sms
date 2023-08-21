

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        let userId: any = req.query.userId

        if (userId == null) {
            res.status(405).json({ message: 'Something went wrong..', errorMessage: 'Bad request.' })
            return
        }
        userId = Number(req.query.userId)
        
        const login_attempts = await prisma.loginAttempt.findMany({
            where: {
                userId
            },
        })

        res.status(200).json({ login_attempts })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong..', errorMessage: error })
    }
}