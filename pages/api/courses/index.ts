import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {

        const courses = await prisma.course.findMany()

        res.status(200).json({ courses })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong..', errorMessage: error })
    }
}