'use client'

import { UserX } from 'lucide-react'
import { BetterAuthActionButton } from './better-auth-action-button'
import { useRouter } from 'next/navigation'
import { admin, useSession } from '@/lib/auth-client'

export function ImpersonationIndicator() {
  const router = useRouter()
  const { data: session, refetch } = useSession()

  if (session?.session.impersonatedBy == null) return null

  return (
    <div className='fixed bottom-24 left-4 z-50'>
      <BetterAuthActionButton
        action={() =>
          admin.stopImpersonating(undefined, {
            onSuccess: () => {
              router.push('/admin')
              refetch()
            }
          })
        }
        variant='destructive'
        size='sm'
      >
        <UserX className='size-4' />
      </BetterAuthActionButton>
    </div>
  )
}
