import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  sendVerificationEmail,
  revokeOtherSessions,
  revokeSession,
  forgetPassword,
  resetPassword,
  updateUser,
  changeEmail,
  deleteUser,
  getSession
} = authClient
