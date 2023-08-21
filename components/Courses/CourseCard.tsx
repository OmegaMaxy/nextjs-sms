import {
    Box,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Heading,
    Button,
    Link,
    Flex,
    Avatar,
    Text,
} from '@chakra-ui/react'

import NextLink from 'next/link'

function LoadingCard() {
    return (
        <Box padding='6' boxShadow='lg' bg='white' borderRadius="6px" w="20%">
            <SkeletonCircle size='10' />
            <Heading as="h2" size="lg" visibility="hidden">Some text</Heading>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <Box mt="1rem">
                <Button colorScheme="blue" mr="1rem">View</Button>
                <Button colorScheme="red">Unroll</Button>
            </Box>
        </Box>
    )
}

export default function CourseCard({ course, children, ...props }: any) {

    return (
        <Box>
            <Avatar name={course.name} src="" mb="1rem"/>

            <Heading as="h3" size="md" mb="2rem">{course.name}</Heading>
            <Text mb="2rem">
                {course.description}
            </Text>
            <Button colorScheme="blue">View</Button>
        </Box>
    )
}