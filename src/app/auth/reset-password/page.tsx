import { Suspense } from 'react'
import { ResetPasswordForm } from './_components/reset-password-form'
import Loader from '@/components/loader'

export default function ResetPasswordPage() {
  return (
    <div className='flex min-h-[80vh] items-center justify-center'>
      <Suspense fallback={<Loader />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
