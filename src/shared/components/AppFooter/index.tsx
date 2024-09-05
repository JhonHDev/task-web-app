import MainLogo from '../MainLogo';

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full  sm:max-w-[85%] lg:max-w-[90%] xl:max-w-[70%]  m-auto px-4 flex flex-col justify-center items-center gap-4 py-6 md:flex-row md:justify-between md:items-center">
      <MainLogo />

      <div className="flex flex-col justify-center items-center">
        <span className="block">Desarrollado por:</span>
        <a
          href="https://www.linkedin.com/in/jhon-esteban-herrera"
          target="_blank"
          rel="noreferrer"
          className="underline text-cobalt hover:text-cobalt/80"
        >
          Jhon Esteban Herrera
        </a>
      </div>

      <p>&copy; {currentYear}</p>
    </footer>
  );
};

export default AppFooter;
