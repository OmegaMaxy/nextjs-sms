import { Box, Heading, Text } from "@chakra-ui/react";
import Head from 'next/head'

import Layout from '../../components/layouts/main'
import CourseTable from "../../components/CourseTable/CourseTable";


export default function CoursesPage() {

    return (
        <Layout>
            <Head>
                <title key="title">Courses</title>
            </Head>
            <Heading>Manage Courses</Heading>
            <CourseTable />
        </Layout>
    )
}