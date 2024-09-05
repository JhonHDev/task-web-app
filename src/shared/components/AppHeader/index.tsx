import { useState } from 'react';

import MainLogo from '../MainLogo';
import Profile from '../Profile';

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center bg-red z-10 bg-white fixed w-full sm:max-w-[85%] lg:max-w-[90%] xl:max-w-[70%] m-auto px-4 md:px-10 py-6 lg:py-3 top-0 left-0 right-0">
      <MainLogo />

      <div className="flex justify-center items-center gap-6 md:gap-12 lg:gap-14">
        <Profile isMenuOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
      </div>
    </header>
  );
};

export default AppHeader;
