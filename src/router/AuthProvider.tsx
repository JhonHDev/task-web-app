import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from '.';

import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../modules/auth/authSlice';
import { auth } from '../config/firebase';

import AppLoader from '../shared/components/AppLoader';

const AuthProvider = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            userId: user.uid,
            name: user.displayName,
            email: user.email,
          })
        );

        setIsLoading(false);
      } else {
        dispatch(removeUser());

        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <AppLoader />;
  }

  return <RouterProvider router={router} />;
};

export default AuthProvider;
