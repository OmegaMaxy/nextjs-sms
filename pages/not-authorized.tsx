import { Heading } from "@chakra-ui/react";
import Layout from '../components/layouts/main'

export default function NotAuthorized() {
    return (
        <Layout>
            <Heading>You're not authorized to view this page, sorry.</Heading>
        </Layout>
    )
}