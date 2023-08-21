import { Heading } from "@chakra-ui/react";
import Layout from '../components/layouts/main'

export default function NotLoggedIn() {
    return (
        <Layout>
            <Heading>You're not logged in, sorry.</Heading>
        </Layout>
    )
}