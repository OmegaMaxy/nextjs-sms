import { 
    Box,
    Flex,
    Link,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useSession, signOut } from 'next-auth/react'

type INavbarProps = {
    path: string,
}

function LinkItem({ children, href, path, ...props }: any) {

    const isActive = (href == path)
    return (
        <Link as={NextLink} href={href} color={isActive ? '#ff63c3' : '#fff'} {...props}>
            {children}
        </Link>
    )
}

export default function Navbar({ path }: INavbarProps) {
    const { status, data: session } = useSession()
    

    const isLoggedin = (status == 'authenticated')

    return (
        <Box p="2rem">
            <Flex justifyContent="space-between">
                <Flex justifyContent="space-evenly" gap={4}>
                    <LinkItem href="/" path={path}>
                        <Text>Home</Text>
                    </LinkItem>
                    <LinkItem href="/students" path={path}>
                        <Text>Students</Text>
                    </LinkItem>
                    <LinkItem href="/staff" path={path}>
                        <Text>Staff</Text>
                    </LinkItem>
                    <LinkItem href="/courses" path={path}>
                        <Text>Courses</Text>
                    </LinkItem>
                </Flex>
                <Flex justifyContent="space-evenly" gap={4}>
                    {isLoggedin ?
                    (
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    <HStack gap={2}>
                                        <Avatar width="30px" height="auto" name={session?.user.username} src="https://placekitten.com/100/100" />
                                        <Text verticalAlign="middle">Your account</Text>
                                    </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem minH='48px'>
                                    <LinkItem href="/courses" path={path}>
                                        <Text>Courses</Text>
                                    </LinkItem>
                                </MenuItem>
                                <MenuItem minH='40px'>
                                    <Button as={Box} colorScheme="red" onClick={() => signOut()}>Log out</Button>
                                </MenuItem>
                            </MenuList>
                            </Menu>
                    )
                    : (
                        <Link as={NextLink} href="/login">
                            <Button variant="solid">Sign in</Button>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}