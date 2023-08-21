import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Heading, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import Layout from '../components/layouts/main'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function LoginPage() {

    const router = useRouter()
    const { status, data } = useSession()

    if (status == 'authenticated') {
        router.push('/')
    }

    const [user, setUser] = useState({ username: "", password: ""})
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)

    function handleUser(username: string, password: string) {
        setUser({username, password})
    }

    function handleEnterKey(e: any) {
        if (e.keyCode == 13) tryLogin()
    }
    
    function tryLogin() {
        setError(false)
        setLoading(true)
        signIn("credentials", { 
            username: user.username, 
            password: user.password, 
            //redirect: false,
            callbackUrl: '/',
        }).then((res: any) => {
            console.log(res)
            if (res.error) {
                setError(true)
            }

            if (res.ok) {
                console.log("res is ok")
                //router.push(res.url)
            }
        }).catch((err) => setError(true))


        
        
        setLoading(false)
    }


    return (
        <Layout>
            <Center>
                <Box>
                    <Heading as="h2" size="lg" my="1rem">Login</Heading>
                    {error ? 
                    <Alert status='error' mb="1rem">
                        <AlertIcon/>
                        <AlertTitle>
                            User not found.
                        </AlertTitle>
                        <AlertDescription>Please try again.</AlertDescription>
                    </Alert> : null}
                    <Heading as="h3" size="md" mt="1rem">Username</Heading>
                    <Input
                        my="1rem"
                        type="text"
                        placeholder="johndoe"
                        value={user.username}
                        onKeyDown={(e) => handleEnterKey(e)}
                        onChange={(e) => handleUser(e.target.value, user.password)} />
                    <Heading as="h3" size="md">Password</Heading>
                    <Input
                        my="1rem"
                        type="password"
                        placeholder="********"
                        value={user.password}
                        onKeyDown={(e) => handleEnterKey(e)}
                        onChange={(e) => handleUser(user.username, e.target.value)}/>
                    <Button isLoading={isLoading} colorScheme="blue" mt="2rem" onClick={tryLogin}>
                        Login
                    </Button>
                </Box>
            </Center>
        </Layout>
    )
}