'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { paths } from '@/paths';
import useAuthStore from '@/store/auth-store';
import { useHydrationZustand } from "@codebayu/use-hydration-zustand";
import { useEffect } from 'react';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user } = useAuthStore()
  const isHydrated = useHydrationZustand(useAuthStore);


  
  useEffect(() => {
    if (!isHydrated) return;

    // fetchUser({
    //   updateUser,
    //   onUnauthorized: () => {
    //     logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
    //     router.replace(paths.auth.signIn)
    //   },
    // })
    if(!user) {
        router.replace(paths.auth.signIn)
    }
  }, [isHydrated]);

  return <React.Fragment>{children}</React.Fragment>;
}
