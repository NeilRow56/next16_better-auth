import { Suspense } from 'react'
import UserSchedule from './_components/user-schedule'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { TableSkeleton } from '@/components/shared/table-skeleton'

export default function AdminPage() {
  return (
    <div className='container mx-auto my-6 px-4'>
      <Link href='/' className='mb-6 inline-flex items-center'>
        <ArrowLeft className='mr-2 size-4' />
        Back to Home
      </Link>
      <Suspense fallback={<TableSkeleton />}>
        <UserSchedule />
      </Suspense>
    </div>
  )
}
