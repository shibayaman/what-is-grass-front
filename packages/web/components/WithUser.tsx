import {
  initialized,
  loggedIn,
  useDispatch,
  useGetLoginUserQuery,
} from '@what-is-grass/shared';
import { useEffect, useRef } from 'react';

const WithUser: React.FC = ({ children }) => {
  const { data, isLoading } = useGetLoginUserQuery();
  const previousLoaingState = useRef(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(loggedIn(data.user));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (previousLoaingState.current && !isLoading) {
      dispatch(initialized());
    }
    previousLoaingState.current = isLoading;
  }, [isLoading, dispatch]);

  return <>{children}</>;
};

export default WithUser;
