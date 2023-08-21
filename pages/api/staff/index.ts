import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {

        const staff = await prisma.staff.findMany({
            include: {
                user: true
            }
        })

        res.status(200).json({ staff })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong..', errorMessage: error })
    }
}