import { Button } from '../ui/button'
import Link from 'next/link'
import { SignOutButton } from '@/app/auth/_components/sign-out-button'

import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/get-session'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function HomeView() {
  const session = await getServerSession()

  const user = session?.user

  if (!user) redirect('/auth')
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
            <Button asChild size='default' variant='outline'>
              <Link href='/organizations'>Organizations</Link>
            </Button>

            <Button variant='outline' asChild size='default'>
              <Link href='/admin'>Admin</Link>
            </Button>

            <SignOutButton />
          </div>
        </>
      )}
    </div>
  )
}
