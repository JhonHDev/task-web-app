import { Link } from 'react-router-dom';

interface Props {
  isToLogin?: boolean;
}

const AuthOptions = ({ isToLogin }: Props) => {
  return (
    <section className="flex justify-center items-center gap-4">
      {isToLogin ? <span>¿Aún no tienes cuenta?</span> : <span>¿Ya tienes cuenta?</span>}

      {isToLogin ? (
        <Link to="/auth/register" className="text-cobalt hover:text-cobalt/80 underline">
          Ir a registrarte
        </Link>
      ) : (
        <Link to="/auth/login" className="text-cobalt hover:text-cobalt/80 underline">
          Ir a iniciar sesión
        </Link>
      )}
    </section>
  );
};

export default AuthOptions;
