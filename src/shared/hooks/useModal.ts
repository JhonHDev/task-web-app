import { useState } from 'react';

const useModal = (initialModalState = false) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialModalState);

  const openModal = () => {
    setIsModalOpen(true);
    window.document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.document.body.classList.remove('overflow-hidden');
  };
  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
