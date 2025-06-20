'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAuthData } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const access_token = searchParams.get('access_token');
    const id_token = searchParams.get('id_token');

    if (access_token) {
      try {
        // Save token to cookies
        document.cookie = `auth_token=${access_token}; path=/; max-age=2592000`; // 30 days
        
        setAuthData({
          accessToken: access_token,
          idToken: id_token,
        });

        // Check for redirect cookie
        const redirectCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth_redirect='));

        const redirectPath = redirectCookie 
          ? decodeURIComponent(redirectCookie.split('=')[1])
          : '/dashboard';

        // Clear redirect cookie
        if (redirectCookie) {
          document.cookie = 'auth_redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }

        // Use replace to prevent back button from returning to callback
        router.replace(redirectPath);
      } catch (error) {
        console.error('Failed to parse user info:', error);
        setError('Authentication failed. Please try again.');
        setTimeout(() => {
          router.replace('/login');
        }, 2000);
      }
    } else {
      setError('No authentication data received.');
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    }
  }, [searchParams, setAuthData, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="text-red-500">
            <p>{error}</p>
            <p className="text-sm mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Completing authentication...</p>
          </>
        )}
      </div>
    </div>
  );
}
