import { Badge, Flex } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null;

    return (
        // <Text color="red" as="p">{children}</Text>
        <Flex>
            <Badge color="red">{children}</Badge>
        </Flex>
    )
}

export default ErrorMessage