import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../../../../config/firebase';

const sendMessageToResetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export default sendMessageToResetPassword;
