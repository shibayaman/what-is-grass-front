import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from '@what-is-grass/shared';

const PrivatePage: FC<{ redirectTo: string }> = ({ redirectTo, children }) => {
  const user = useSelector((state) => state.auth.user);
  const initialized = useSelector((state) => state.auth.initialized);
  const router = useRouter();

  useEffect(() => {
    if (initialized && user === null) {
      router.replace(redirectTo);
    }
  }, [user, initialized, router, redirectTo]);

  return <>{children}</>;
};

export default PrivatePage;
