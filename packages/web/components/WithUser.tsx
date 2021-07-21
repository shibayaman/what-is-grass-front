import { useEffect } from 'react';
import {
  useGetLoginUserQuery,
  loggedIn,
  useDispatch,
} from '@what-is-grass/shared';

const WithUser: React.FC = ({ children }) => {
  const { data: user } = useGetLoginUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loggedIn(user));
    }
  }, [user, dispatch]);

  return <>{children}</>;
};

export default WithUser;
