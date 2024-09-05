import { useSelector } from 'react-redux';

import { RootState } from '../../../config/redux/store';

import ProfileMenu from './ProfileMenu';

interface Props {
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
}

const Profile = ({ isMenuOpen, toggleMenuOpen }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="relative">
      <button onClick={toggleMenuOpen} className="" type="button" title="Abrir menú">
        <div className="flex justify-center items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-malachite">
            <span className="font-mediumuppercase text-white">{user?.name?.substring(0, 1)}</span>
          </div>
        </div>
      </button>

      {isMenuOpen && <ProfileMenu name={user?.name} />}
    </div>
  );
};

export default Profile;
