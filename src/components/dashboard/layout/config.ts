import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

export const navItems = [
  // { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'bookings', title: 'Bookings', href: paths.dashboard.bookings, icon: 'users' },
  { key: 'newsletter', title: 'NewsLetter Subs', href: paths.dashboard.newsletter, icon: 'user' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
