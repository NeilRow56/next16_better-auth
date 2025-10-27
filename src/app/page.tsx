import { SignOutButton } from './auth/_components/sign-out-button'

export default function Home() {
  return (
    <div className='container mx-auto mt-24 flex flex-col space-y-8 text-center'>
      <h1>Home page</h1>
      <SignOutButton />
    </div>
  )
}
