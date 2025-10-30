import { Suspense } from 'react'
import HomeView from '@/components/home/home-view'

import Loader from '@/components/loader'

export default async function Home() {
  return (
    <div className='mx-auto my-6 max-w-md px-4'>
      <Suspense>
        <HomeView />
      </Suspense>
    </div>
  )
}
