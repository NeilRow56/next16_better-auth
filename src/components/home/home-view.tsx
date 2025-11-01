'use client'

import { Button } from '../ui/button'
import Link from 'next/link'
import { SignOutButton } from '@/app/auth/_components/sign-out-button'

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'

export default function HomeView() {
  const [hasAdminPermission, setHasAdminPermission] = useState(false)
  const { data: session, isPending: loading } = authClient.useSession()

  const user = session?.user

  useEffect(() => {
    authClient.admin
      .hasPermission({ permission: { user: ['list'] } })
      .then(({ data }) => {
        setHasAdminPermission(data?.success ?? false)
      })
  }, [])

  return (
    <div className='space-y-6 text-center'>
      {user == null ? (
        <>
          <h1 className='text-3xl font-bold'>Welcome to Our App</h1>
          <Button asChild size='lg'>
            <Link href='/auth'>Sign In / Sign Up</Link>
          </Button>
        </>
      ) : (
        <>
          <h1 className='text-3xl font-bold'>Welcome {user?.name}!</h1>
          <div className='flex justify-center gap-4'>
            <Button asChild size='default'>
              <Link href='/profile'>Profile</Link>
            </Button>
            {hasAdminPermission && (
              <Button variant='outline' asChild size='lg'>
                <Link href='/admin'>Admin</Link>
              </Button>
            )}
            <Button asChild size='default' variant='outline'>
              <Link href='/organizations'>Organizations</Link>
            </Button>

            <SignOutButton />
          </div>
        </>
      )}
    </div>
  )
}
