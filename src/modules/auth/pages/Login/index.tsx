import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { loginWithEmailAndPassword } from '../../services';
import { addUser } from '../../authSlice';

import AuthFormTitle from '../../components/AuthFormTitle';
import AuthOptions from '../../components/AuthOptions';
import AuthLoader from '../../components/AuthLoader';

type FormFiels = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormFiels>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    const { email, password } = getValues();
    setIsLoading(true);

    try {
      const user = await loginWithEmailAndPassword({ email, password });

      dispatch(
        addUser({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
        })
      );

      reset();
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-10 w-full h-[100vh] justify-center items-center animate__animated animate__fadeInRight">
      <AuthFormTitle title="Iniciar sesión" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <label htmlFor="email" className="flex flex-col gap-2">
          <span>Correo electrónico:</span>
          <input
            type="email"
            id="email"
            className={`outline-none min-w-[300px] border px-4 py-2 rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            } `}
            {...register('email', {
              required: {
                value: true,
                message: 'El correo electrónico es requerido',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Correo electrónico no válido',
              },
            })}
          />
        </label>

        {errors.email && <span className="text-red-500 -mt-2">{errors.email.message}</span>}

        <label htmlFor="password" className="flex flex-col gap-2">
          <span>Contraseña:</span>
          <input
            type="password"
            id="password"
            className={`outline-none min-w-[300px] border px-4 py-2 rounded-md ${
              errors.password ? 'border-red-500' : 'border-gray-600'
            } `}
            {...register('password', {
              required: {
                value: true,
                message: 'Contraseña es requerida',
              },
              minLength: {
                value: 6,
                message: 'Contraseña mínimo de 6 caracteres',
              },
            })}
          />
        </label>

        {errors.password && <span className="text-red-500 -mt-2">{errors.password.message}</span>}

        <button
          disabled={isLoading}
          className={` text-white py-3 rounded-md flex justify-center items-center ${
            isLoading ? 'bg-malachite/60' : 'bg-malachite hover:bg-malachite/90'
          }`}
          type="submit"
        >
          {isLoading && <AuthLoader />}
          {!isLoading && <span>Ingresar</span>}
        </button>
      </form>

      <Link to="/auth/forgot-password" className="text-gray-950 hover:text-gray-700 underline">
        Olvide mi contraseña
      </Link>

      <AuthOptions isToLogin />
    </section>
  );
};

export default Login;
