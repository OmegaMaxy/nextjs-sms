import { 
    Box,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";



export default function LoginAttemptsTable({ user, children, ...props }: any) {
    
    return (
        <Box>
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {user.login_attempts.length != 0 ? user.login_attempts.map((attempt: any) => (
                            <Tr>
                                <Td>{attempt.created_at}</Td>
                            </Tr>
                        )) : 
                        <Tr>
                            <Td>No login attempts yet.</Td>
                        </Tr>
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Date</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}