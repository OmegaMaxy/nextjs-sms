import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../Navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../Footer'
import { useRouter } from 'next/router'

const Main = ({ children }: any) => {

    const router = useRouter()

    return (
        <Box as="main" pb={8} >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" href="https://omegatoday.eu/app/img/ou/OmegaUnaIcon.ico" />
                <link rel="shortcut icon" href="https://omegatoday.eu/app/img/ou/OmegaUnaIcon.ico" />
                <title key="title">Student management system</title>
            </Head>

            <NavBar path={router.asPath} />

            <Container maxW="container.lg" pt={14} >

                {children}

                <Footer />
            </Container>
        </Box>
    )
}

export default Main
