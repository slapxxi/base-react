import { z } from 'zod'

export let loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export let loginFormDefaults: LoginFormValues = {
  email: '',
  password: '',
}

export let fallbackSignInError = 'Unable to sign in'

export let signInLabels = {
  idle: 'Sign in',
  submitting: 'Signing in…',
}

export let loginFields = {
  email: {
    label: 'Email address',
    placeholder: 'admin@example.com',
    autoComplete: 'email',
  },
  password: {
    label: 'Password',
    placeholder: '••••••••',
    autoComplete: 'current-password',
  },
}

export let inputClassName =
  'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'

export let submitButtonClassName =
  'inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60'
