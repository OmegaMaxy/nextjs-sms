import LoginAttemptsTable from '../../../components/Users/LoginAttemptsTable'
import Layout from '../../../components/layouts/main'
import { 
    Heading,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function LoginAttempts(props: any) {

    
    if (props.error) {
        return (
            <Layout>
                <Heading>Could not fetch login attempts.</Heading>
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Something went wrong!</AlertTitle>
                    <AlertDescription>Could not fetch login attempts, please try again.</AlertDescription>
                </Alert>
            </Layout>
        )
    }
    
    const user = props.user

    return (
        <Layout>
            <Heading mb="2rem">Viewing login attempts of {' '}
                <Link as={NextLink} href={`/users/${user.id}`}>
                    {user.username}
                </Link>
            </Heading>
            <LoginAttemptsTable user={user}/>
        </Layout>
    )
}


export async function getServerSideProps(context: any) {

    let error = null
    let userId
    let user
    try {
        userId = context.query.userId
    } catch (error) {
        error = true 
    }
    console.log(userId)
    if (!error) {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`)
        const data = await res.json()
        user = data.user
        console.log(data)
        if (!user) error = true 
    }

    return {
        props: {
            user,
            error
        }
    }
}