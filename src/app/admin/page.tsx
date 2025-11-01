import { Suspense } from 'react'
import UserSchedule from './_components/user-schedule'

export default function AdminPage() {
  return (
    <Suspense>
      <UserSchedule />
    </Suspense>
  )
}
