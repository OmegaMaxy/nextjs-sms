

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        let studentId: any = req.query.studentId

        if (studentId == null) {
            res.status(405).json({ message: 'Something went wrong..', errorMessage: 'Bad request.' })
            return
        }
        studentId = Number(req.query.studentId)
        const enrolledSubjects = await prisma.studentSubject.findMany({
            where: {
                studentId
            },
            include: {
                subject: {
                    include: {
                        course: true,
                        teacher: true,
                    }
                }
            }
        })

        res.status(200).json({ enrolledSubjects })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong..', errorMessage: error })
    }
}