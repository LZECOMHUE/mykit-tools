'use client';

import { AuthProvider } from '@/lib/mock-auth';
import { MyKitProvider } from '@/lib/mykit-context';

export default function MockAuthWrapper({ children }) {
  return (
    <AuthProvider>
      <MyKitProvider>
        {children}
      </MyKitProvider>
    </AuthProvider>
  );
}
