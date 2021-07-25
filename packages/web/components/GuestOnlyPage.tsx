import { FC, useEffect } from 'react';
import { useSelector } from '@what-is-grass/shared';
import { useRouter } from 'next/router';

const GuestOnlyPage: FC<{ redirectTo: string }> = ({
  redirectTo,
  children,
}) => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.replace(redirectTo);
    }
  }, [user, router]);

  return <>{children}</>;
};

export default GuestOnlyPage;
