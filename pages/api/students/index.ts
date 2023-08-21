import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        const students = await prisma.student.findMany({
            include: {
                user: true,
            }
        })

        res.status(200).json({ students })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong..', errorMessage: error })
    }
}