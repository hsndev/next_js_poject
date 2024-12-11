import React from 'react'
import { Button } from '@radix-ui/themes'
import { SunIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const IssuesPage = () => {
  return (
    <div>
      <Button><SunIcon /> <Link href='/issues/new'>new issue</Link> </Button>
    </div>
  )
}

export default IssuesPage