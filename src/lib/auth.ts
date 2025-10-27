import VerifyEmail from '@/components/emails/verify-email'
import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: 'Verify your email',
        react: VerifyEmail({ username: user.name, verifyUrl: url })
      })
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },

  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  plugins: [nextCookies()]
})

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'UNKNOWN'
