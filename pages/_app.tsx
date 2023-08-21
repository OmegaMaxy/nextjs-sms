import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import React, { useState } from 'react'
import { Router } from 'next/router'
import { SessionProvider, useSession } from 'next-auth/react'
import { Spinner } from '@chakra-ui/react'

type IWebsiteProps = {
    Component: any,
    pageProps: any,
    router: Router
}

function Website({ Component, pageProps, router }: IWebsiteProps) {
    return (
        <Chakra cookies= { pageProps.cookies } >
            <SessionProvider session={pageProps.session}>
                <Fonts />
                <AnimatePresence mode='wait' initial={true} >
                {Component.auth ? (
                    <Auth auth={Component.auth} router={router}>
                        <Component {...pageProps} key={router.route} />
                    </Auth>
                    ) : (
                    <Component {...pageProps} key={router.route} />
                )}
                </AnimatePresence>
            </SessionProvider>
        </Chakra>
    )
}

function Auth({ children, auth, router }: any) {
    const { status, data } = useSession({ required: true, onUnauthenticated() {
        router.push(auth.unauthenticated ? auth.unauthenticated : '/not-logged-in')
    }})
    if (status === 'loading') {
        return (auth.loading) ? auth.loading : <Spinner />
    }

    if (!data || !data.user) return null // unauthenticated

    if (data?.user.role != auth.role) {
        router.push(auth.unauthorized)
    }
    return children
}

export default Website
