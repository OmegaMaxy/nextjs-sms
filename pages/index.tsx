import { 
    Box, 
    Heading,
    SkeletonCircle,
    SkeletonText,
    Flex,
    Button,
    HStack,
    Avatar,
    Text,
    Link,
    Fade,
} from "@chakra-ui/react";
import Layout from '../components/layouts/main'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { useEffect, useState } from "react";

function Subject({ children, ...props }: any) {
    return (
        <Box padding='6' boxShadow='lg' bg='white' borderRadius="6px" w="20%">
            <SkeletonCircle size='10' />
            <Heading as="h2" size="lg" visibility="hidden">Some text</Heading>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <Flex mt="1rem" justifyContent="space-evenly">
                <Button colorScheme="blue" mr="1rem">View</Button>
                <Button colorScheme="red">Unroll</Button>
            </Flex>
        </Box>
    )
}
function HomeSubjects(props: any) {

    const [enrolledSubjects, setSubjects] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)

    const session = useSession()

    async function getData() {
        const res = await fetch(`http://localhost:3000/api/students/${session?.data?.user.student.id}/subjects`)
        const data = await res.json()
        setSubjects(data.enrolledSubjects)
    }

    useEffect(() => {
        if (session.status == 'authenticated') {
            getData()
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [session])

    if (isLoggedIn) {

        return (
            <Fade in={true} delay={0.3}>
                <Box>
                    <Heading as="h2" size="md" mt="1rem">Your subjects</Heading>
                    {enrolledSubjects.length != 0 ?
                        (
                            <Flex gap={8} mt="2rem" flexWrap="wrap">
                                {enrolledSubjects.map((subject: any) => (
                                    <Box padding='6' boxShadow='lg' bg='white' borderRadius="6px" w="20%">
                                        <Avatar name={subject.name} size="md" />
                                        <Heading as="h2" size="lg">{subject.name}</Heading>
                                        <Text>{subject.description}</Text>
                                        <Flex mt="1rem" justifyContent="space-evenly">
                                            <Link as={NextLink} href={`/subjects/${subject.id}`}>
                                                <Button colorScheme="blue" mr="1rem" color="#fff">View</Button>
                                            </Link>
                                            <Button colorScheme="red">Unroll</Button>
                                        </Flex>
                                    </Box>
                                ))}
                            </Flex>
                        )
                        :
                        (
                            <Box>
                                <Text>Enroll in some courses to view them here.</Text>
                            </Box>
                        )}
                </Box>
            </Fade>
        )
    }

    return (
        <Fade in={true} delay={0.3}>
            <Box>
                <Heading as="h2" size="md" mt="1rem">Sign in to view your subjects below</Heading>
                <Flex gap={8} mt="2rem" flexWrap="wrap">
                    <Subject />
                    <Subject />
                    <Subject />
                    <Subject />
                    <Subject />
                </Flex>
            </Box>
        </Fade>
    )
}
export default function Homepage() {
    
    return (
        <Layout>
            <Heading>Homepage</Heading>
            <HomeSubjects/>
        </Layout>
    )
}