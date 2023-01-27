import '@styles/globals.css';
import type { AppType } from 'next/app';
import { type Session } from 'next-auth';
import { trpc } from 'utils/trpc';
import { SessionProvider } from 'next-auth/react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '~/store';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const { data: user } = useQuery(['user', session?.user?.email], {
    enabled: !!session?.user?.email,
  });
  useEffect(() => {
    const unlisten = router.events.on('routeChangeComplete', () => {
      persistor.persist();
    });
    return () => {
      //unlisten();
    };
  }, []);
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(App);
