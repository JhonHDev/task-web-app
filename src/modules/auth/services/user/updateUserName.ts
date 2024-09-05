import { User, updateProfile } from 'firebase/auth';

interface Params {
  user: User;
  name: string;
}

const updateUserName = async ({ user, name }: Params) => {
  await updateProfile(user, {
    displayName: name,
  });
};

export default updateUserName;
