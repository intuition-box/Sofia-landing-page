import React from 'react';
import OriginalLayoutProvider from '@theme-original/Layout/Provider';
import ThemedCardNav from '@site/src/components/CardNav/ThemedCardNav';

export default function LayoutProvider({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <OriginalLayoutProvider>
      <ThemedCardNav />
      {children}
    </OriginalLayoutProvider>
  );
}
