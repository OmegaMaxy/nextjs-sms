import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'johndoe' },
                password: { label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:3000/api/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()
                const user = data.user
                console.log(data)
                // If no error and we have user data, return it
                if (res.ok && user) {
                    console.log("RETURNING USER OK")
                    return user
                }
                // Return null if user data could not be retrieved
                //throw new Error('User not found. Please try again.')
                return null
            }
        }),
    // ...add more providers here
  ],
  pages: {
    'signIn': '/login'
  },
  callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     /*console.log(user)
        //     console.log(account)
        //     console.log(profile)
        //     console.log(email)
        //     console.log(credentials)*/
        //     return true
        // }, 
        // async redirect({ url, baseUrl }) {
        //     return url
        // },
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    staff: user.staff,
                    student: user.student
                }
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            let newSession = token
            newSession.expires = session.expires
            
            console.log('session callback')
            console.log(newSession)
            return newSession
        }
  },
  session: {
      maxAge: 30 * 24 * 60 * 60,
      strategy: 'jwt',
  },
}

export default NextAuth(authOptions)