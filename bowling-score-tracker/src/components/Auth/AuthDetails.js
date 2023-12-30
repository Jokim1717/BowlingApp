import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged', user);
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    // Cleanup function
    return () => {
      console.log('Cleaning up AuthDetails component');
      unsubscribe();
    };
  }, []);

  return <div>{authUser ? <p>Signed In</p> : <p>Signed Out</p>}</div>;
};

export default AuthDetails;
