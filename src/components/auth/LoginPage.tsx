import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation } from 'react-router-dom'
import {
  fallbackSignInError,
  inputClassName,
  loginFields,
  loginFormDefaults,
  loginSchema,
  signInLabels,
  submitButtonClassName,
} from '@/components/auth/LoginPage.config'
import { LogoIcon } from '@/components/landing/icons'
import { useAuth } from '@/lib/auth/useAuth'
import type { LoginFormValues } from '@/components/auth/LoginPage.config'

export let LoginPage: React.FC = () => {
  let { user, status, login } = useAuth()
  let location = useLocation()
  let [error, setError] = useState('')
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaults,
  })

  let from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/admin'

  if (status === 'loading') {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <span className="size-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
      </div>
    )
  }

  if (user) {
    return <Navigate to={from} replace />
  }

  let onSubmit = async (values: LoginFormValues) => {
    setError('')

    try {
      await login(values.email, values.password)
    } catch (err) {
      setError(err instanceof Error ? err.message : fallbackSignInError)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-950 px-12 py-16 text-white lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="relative flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid size-9 place-items-center rounded-lg bg-white/10">
            <LogoIcon className="size-5" />
          </span>
          orbit<span className="text-indigo-400">.</span>
        </div>

        <div className="relative my-auto max-w-md">
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            Admin area
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance">
            Everything you need to keep things running.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-400">
            Sign in with an account created by the Go auth service to access the dashboard and
            manage your workspace.
          </p>
        </div>

        <p className="relative text-sm text-slate-500">© 2026 Orbit UI. All rights reserved.</p>
      </div>

      <div className="flex items-center justify-center bg-slate-50 px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2 text-lg font-bold tracking-tight lg:hidden">
            <span className="grid size-9 place-items-center rounded-lg bg-slate-900 text-white">
              <LogoIcon className="size-5" />
            </span>
            orbit<span className="text-indigo-600">.</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">Enter your admin credentials to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                {loginFields.email.label}
              </label>
              <input
                id="email"
                type="email"
                autoComplete={loginFields.email.autoComplete}
                placeholder={loginFields.email.placeholder}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClassName}
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                {loginFields.password.label}
              </label>
              <input
                id="password"
                type="password"
                autoComplete={loginFields.password.autoComplete}
                placeholder={loginFields.password.placeholder}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className={inputClassName}
                {...register('password')}
              />
              {errors.password && (
                <p id="password-error" className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className={submitButtonClassName}>
              {isSubmitting ? signInLabels.submitting : signInLabels.idle}
            </button>
          </form>

          <p className="mt-8 text-center text-xs leading-6 text-slate-400">
            Access is restricted. Accounts are created with the auth service CLI.
          </p>
        </div>
      </div>
    </div>
  )
}
