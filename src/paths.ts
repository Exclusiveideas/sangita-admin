export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    // overview: '/dashboard',
    // account: '/dashboard/account',
    bookings: '/dashboard/bookings',
    newsletter: '/dashboard/newsletter',
    // customers: '/dashboard/customers',
    // integrations: '/dashboard/integrations',
    // settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
