import { Box, Heading, Text } from "@chakra-ui/react";
import Head from 'next/head'

import Layout from '../../components/layouts/main'
import StaffTable from "../../components/StaffTable/StaffTable";


export default function StaffPage() {

    return (
        <Layout>
            <Head>
                <title key="title">Staff</title>
            </Head>
            <Heading>Manage staff</Heading>
            <StaffTable />
        </Layout>
    )
}

StaffPage.auth = {
    role: 'admin',
    //loading: 'admin',
    unauthorized: '/not-authorized',
}