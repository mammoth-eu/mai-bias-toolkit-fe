import {useState} from "react";

export interface ModalControls {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useModal = () => {

  const [isOpen, setIsOpen] = useState(false)

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen: isOpen,
    open: open,
    close: close,
  };
};

export default useModal;
