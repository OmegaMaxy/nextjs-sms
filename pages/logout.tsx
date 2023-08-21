import { signOut } from "next-auth/react"
import { useEffect } from "react"


export default function logout() {

    useEffect(() => {
        signOut({redirect: true, callbackUrl: '/'})
    }, [])

    return (
        <div>
            <h1>Logging you out...</h1>
        </div>
    )
}