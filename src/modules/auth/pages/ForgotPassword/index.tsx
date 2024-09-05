import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { sendMessageToResetPassword } from '../../services';

import AuthFormTitle from '../../components/AuthFormTitle';
import AuthLoader from '../../components/AuthLoader';
import { Link } from 'react-router-dom';

type FormFiels = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormFiels>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    const { email } = getValues();
    setIsLoading(true);

    try {
      await sendMessageToResetPassword(email);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-11 w-full h-[100vh] justify-center items-center animate__animated animate__fadeInDown">
      <AuthFormTitle
        title="¿Olvidaste tu contraseña?"
        description="Ingresa tu correo y será enviado un enlace a su bandeja para que cambie la contraseña"
      />

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

        <button
          disabled={isLoading}
          className={` text-white py-3 rounded-md flex justify-center items-center ${
            isLoading ? 'bg-malachite/60' : 'bg-malachite hover:bg-malachite/90'
          }`}
          type="submit"
        >
          {isLoading && <AuthLoader />}
          {!isLoading && <span> Cambiar contraseña</span>}
        </button>

        <Link to="/auth/login" className="underline text-cobalt hover:text-cobalt/80 text-center py-2">
          Regresar
        </Link>
      </form>
    </section>
  );
};

export default ForgotPassword;
