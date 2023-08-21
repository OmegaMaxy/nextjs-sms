

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
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                login_attempts: true,
            }
        })

        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong..', errorMessage: error })
    }
}