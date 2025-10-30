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
import { passwordSchema } from '@/zod-schemas/password'
import { LoadingSwap } from '@/components/shared/loading-swap'
import { signUp } from '@/server-actions/users'
import { useRouter } from 'next/navigation'

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.email('Please enter a valid email address!'),
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
      return registerSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success
    }
  })
type RegisterSchemaType = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: RegisterSchemaType) {
    const { success, message } = await signUp(
      values.email,
      values.password,
      values.name
    )

    if (success) {
      toast.success(
        `${message as string} Please check your email for verification.`
      )
      router.push('/')
    } else {
      toast.error(message as string)
    }
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle>Welcome to WpAccPac!</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='registration-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput control={form.control} name='name' label='Name' />
            <FormInput control={form.control} name='email' label='Email' />
            <FormPasswordInput
              control={form.control}
              name='password'
              label='Password'
            />
            <div>
              <h3 className='text-xs text-blue-500'>
                Minimum 8 characters and at least one special character e.g. !
                or *
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
      <CardFooter className=''>
        <Field orientation='horizontal' className='justify-between'>
          <Button
            type='submit'
            form='registration-form'
            className='w-full max-w-[150px] cursor-pointer dark:bg-blue-600 dark:text-white'
            disabled={isSubmitting}
          >
            <LoadingSwap isLoading={isSubmitting}>Sign in</LoadingSwap>
          </Button>
          <Button
            className='border-red-500'
            type='button'
            form='registration-form'
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
