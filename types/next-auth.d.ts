import NextAuth from "next-auth"
import UserRole from '@prisma/client'

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's id. */
            id: number
            /** The user's username. */
            username: string
            /** The user's email. */
            email: string
            /** The user's role. */
            role: UserRole
            /** The user's created at date. */
            created_at: Date
            /** The user's updated at data. */
            updated_at: Date
            /** The user's staff object. */
            staff: any
            /** The user's student object. */
            student: any
        }
    }
}