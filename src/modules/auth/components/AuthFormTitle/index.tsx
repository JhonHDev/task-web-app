interface Props {
  title: string;
  description?: string;
}

const AuthFormTitle = ({ title, description }: Props) => {
  return (
    <>
      {title && description ? (
        <section className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-gray-60 max-w-md text-center">{description}.</p>
        </section>
      ) : (
        <h1 className="text-2xl">{title}</h1>
      )}
    </>
  );
};

export default AuthFormTitle;
