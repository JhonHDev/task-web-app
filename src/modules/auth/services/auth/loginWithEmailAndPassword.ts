import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../../config/firebase';

interface Params {
  email: string;
  password: string;
}

const loginWithEmailAndPassword = async ({ email, password }: Params) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export default loginWithEmailAndPassword;
