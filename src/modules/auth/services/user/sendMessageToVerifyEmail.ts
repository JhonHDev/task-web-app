import { User, sendEmailVerification } from 'firebase/auth';

const sendMessageToVerifyEmail = async (user: User) => {
  await sendEmailVerification(user);
};

export default sendMessageToVerifyEmail;
