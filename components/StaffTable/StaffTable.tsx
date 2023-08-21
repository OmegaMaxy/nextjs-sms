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



export default function StaffTable({ children, ...props }: any) {

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    async function getStaff() {
        setLoading(true)
        const res = await fetch('http://localhost:3000/api/staff')
        setData(await res.json())
        setLoading(false)
    }

    function startPolling() {
        setInterval(() => {
            getStaff()
        }, 10000)
    }

    useEffect(() => {
        
        getStaff()
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

    if (!data.staff) {
        return (
            <Box>
                <Text>No staff found.</Text>
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
                            <Th>Badge number</Th>
                            <Th>Business role</Th>
                            <Th>Account Creation Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.staff.map((member: any, id: number) => (
                            <Tr key={id}>
                                <Td>{member.firstname}</Td>
                                <Td>{member.lastname}</Td>
                                <Td>{member.user.email}</Td>
                                <Td>{member.badge_number}</Td>
                                <Td>{member.business_role}</Td>
                                <Td>{member.user.created_at}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>First name</Th>
                            <Th>Last name</Th>
                            <Th>Email address</Th>
                            <Th>Badge number</Th>
                            <Th>Business role</Th>
                            <Th>Account Creation Date</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            
        </Box>
    )
}