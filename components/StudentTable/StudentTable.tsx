import { 
    Box,
    Spinner,
    Text,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NextLink from 'next/link'


export default function StudentTable({ children, ...props }: any) {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    async function getStudents() {
        setLoading(true)
        const res = await fetch('http://localhost:3000/api/students')
        setData(await res.json())
        setLoading(false)
    }

    function startPolling() {
        setInterval(() => {
            getStudents()
        }, 10000)
    }

    useEffect(() => {
        
        getStudents()
        startPolling()
    }, [])

    if (isLoading) {
        return (
            <Box>
                <Spinner/>
                <Text>Loading...</Text>
            </Box>
        )
    }

    if (!data) {
        return (
            <Box>
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Something went badly wrong!</AlertTitle>
                    <AlertDescription>Please contact a system administrator.</AlertDescription>
                </Alert>
            </Box>
        )
    }

    if (!data.students) {
        return (
            <Box>
                <Text>No students found.</Text>
            </Box>
        )
    }
    
    if (data.error) {
        return (
            <Box>
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Something went wrong!</AlertTitle>
                    <AlertDescription>Please try again.</AlertDescription>
                </Alert>
            </Box>
        )
    }

    return (
        <Box>
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>First name</Th>
                            <Th>Last name</Th>
                            <Th>Email address</Th>
                            <Th>Username</Th>
                            <Th>Date Joined</Th>
                            <Th>Login attempts</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.students.map((student: any, id: number) => (
                            <Tr key={id}>
                                <Td>{student.firstname}</Td>
                                <Td>{student.lastname}</Td>
                                <Td>{student.user.email}</Td>
                                <Td>{student.user.username}</Td>
                                <Td>{student.created_at}</Td>
                                <Td>
                                    <Link as={NextLink} href={`/users/${student.user.id}/login_attempts`}>
                                        View login attempts
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>First name</Th>
                            <Th>Last name</Th>
                            <Th>Email address</Th>
                            <Th>Username</Th>
                            <Th>Date Joined</Th>
                            <Th>Login attempts</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            
        </Box>
    )
}