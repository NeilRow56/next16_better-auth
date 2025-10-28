/* eslint-disable @next/next/no-img-element */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

import { FormPasswordInput } from '@/components/form/form-base'

import { z } from 'zod/v4'
import { toast } from 'sonner'
import { useState } from 'react'

import { LoadingSwap } from '@/components/shared/loading-swap'
import { resetPassword } from '@/lib/auth-client'
import { passwordSchema } from '@/zod-schemas/password'
import { useRouter, useSearchParams } from 'next/navigation'

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(6, {
      message: 'Passwords do not match'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],

    // run if password & confirmPassword are valid
    when(payload) {
      return formSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    }
  })

interface ResetPasswordFormProps {
  onSuccess?: () => void
}

export function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token') as string

  const [isPending, setPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true)

    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match')
      setPending(false)
      return
    }

    const { error } = await resetPassword({
      newPassword: values.password,
      token
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Password reset successfully')
      router.push('/auth')
    }

    setPending(false)
  }

  return (
    <Card className='flex w-full max-w-md overflow-hidden p-6'>
      <CardHeader className='text-center'>
        <CardTitle className='text-primary'>Reset Password?</CardTitle>
        <CardDescription>
          Please enter your current password. A link will be sent to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex w-full p-6'>
        <form id='forgot-password-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className='min-w-[348px]'>
            <FormPasswordInput
              control={form.control}
              name='password'
              label='Password'
            />
            <div>
              <h3 className='text-xs text-blue-500'>
                Minimum 8 characters including at least one special character.
              </h3>
            </div>
            <FormPasswordInput
              control={form.control}
              name='confirmPassword'
              label='Confirm Password'
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className='max-w-[310px]'>
        <Field orientation='horizontal'>
          <Button
            type='submit'
            form='forgot-password-form'
            className='w-full cursor-pointer dark:bg-blue-600 dark:text-white'
            disabled={isPending}
          >
            <LoadingSwap isLoading={isPending}>Send</LoadingSwap>
          </Button>
          <Button
            className='border-red-500'
            type='button'
            form='forgot-password-form'
            variant='outline'
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
