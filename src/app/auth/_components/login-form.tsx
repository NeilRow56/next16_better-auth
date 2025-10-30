'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldGroup } from '@/components/ui/field'

import { FormInput, FormPasswordInput } from '@/components/form/form-base'

import { LoadingSwap } from '@/components/shared/loading-swap'
import { signIn } from '@/server-actions/users'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.email('Please enter a valid email address!'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginSchemaType = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: LoginSchemaType) {
    const { success, message } = await signIn(values.email, values.password)

    if (success) {
      toast.success(message as string)
      router.push('/dashboard')
    } else {
      toast.error((message as string) || 'Failed to sign up')
    }
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Log in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput control={form.control} name='email' label='Email' />
            <FormPasswordInput
              control={form.control}
              name='password'
              label='Password'
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className=''>
        <Field orientation='horizontal' className='justify-between'>
          <Button
            type='submit'
            form='login-form'
            className='w-full max-w-[150px] cursor-pointer dark:bg-blue-600 dark:text-white'
            disabled={isSubmitting}
          >
            <LoadingSwap isLoading={isSubmitting}>Sign in</LoadingSwap>
          </Button>
          <Button
            className='border-red-500'
            type='button'
            form='login-form'
            variant='outline'
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </Field>
      </CardFooter>
      <div className='px-6'>
        <Link
          href='/auth/forgot-password'
          className='ml-auto text-sm text-blue-600 underline-offset-4 hover:underline'
        >
          <span className='dark:text-blue-300'>Forgot your password?</span>
        </Link>
      </div>
    </Card>
  )
}
