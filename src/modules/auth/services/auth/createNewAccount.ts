import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../../config/firebase';

import updateUserName from '../user/updateUserName';
import sendMessageToVerifyEmail from '../user/sendMessageToVerifyEmail';

interface Params {
  name: string;
  email: string;
  password: string;
}

const createNewAccount = async ({ name, email, password }: Params) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateUserName({ user, name });
  await sendMessageToVerifyEmail(user);

  return user;
};

export default createNewAccount;
