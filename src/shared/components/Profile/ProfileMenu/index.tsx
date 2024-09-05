import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import closeAuthSession from '../../../services/auth/closeAuthSession';

import { removeUser } from '../../../../modules/auth/authSlice';

interface Props {
  name: string | null | undefined;
}

const ProfileMenu = ({ name }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseAuthSession = async () => {
    await closeAuthSession();
    dispatch(removeUser());
    navigate('/auth/login');
  };

  return (
    <div className="absolute top-12 lg:top-12 right-0 z-10 shadow-lg shadow-gray bg-white hiddendivide-y divide-gray-100 rounded-lg w-44">
      <ul className="py-0 text-sm text-gray-700 rounded-lg overflow-hidden">
        <span className="w-full block px-4 py-3 ">Perfil de {name}</span>

        <button
          onClick={handleCloseAuthSession}
          className="w-full text-start block px-4 py-3 hover:bg-gray-100"
          type="button"
        >
          Cerrar sesión
        </button>
      </ul>
    </div>
  );
};

export default ProfileMenu;
