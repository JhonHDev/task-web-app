import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <AppHeader />

      <main className="w-full min-h-[78vh] sm:max-w-[85%] lg:max-w-[90%] 2xl:max-w-[80%] m-auto px-4 md:px-10 py-6 lg:py-3 mt-20 lg:mt-0 animate__animated animate__fadeIn">
        {children}
      </main>

      <AppFooter />
    </>
  );
};

export default AppLayout;
