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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";



export default function CourseTable({ children, ...props }: any) {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    async function getCourses() {
        setLoading(true)
        const res = await fetch('http://localhost:3000/api/courses')
        setData(await res.json())
        setLoading(false)
    }

    function startPolling() {
        setInterval(() => {
            getCourses()
        }, 10000)
    }

    useEffect(() => {
        
        getCourses()
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

    if (!data.courses) {
        return (
            <Box>
                <Text>No courses found.</Text>
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
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Last updated</Th>
                            <Th>Creation date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.courses.map((course: any, id: number) => (
                            <Tr key={id}>
                                <Td>{course.name}</Td>
                                <Td>{course.description}</Td>
                                <Td>{course.updated_at}</Td>
                                <Td>{course.created_at}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Last updated</Th>
                            <Th>Creation date</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            
        </Box>
    )
}