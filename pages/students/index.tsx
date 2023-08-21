import { Box, Heading, Text } from "@chakra-ui/react";
import Head from 'next/head'

import Layout from '../../components/layouts/main'
import StudentTable from "../../components/StudentTable/StudentTable";


function StudentsPage() {

    return (
        <Layout>
            <Head>
                <title key="title">Students</title>
            </Head>
            <Heading>Manage Students</Heading>
            <StudentTable/>
        </Layout>
    )
}

StudentsPage.auth = {
    role: 'admin',
    //loading: 'admin',
    unauthorized: '/not-authorized',
}

export default StudentsPage