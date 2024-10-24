import React, { useRef } from 'react';
import { ModalHandler } from './Modal';

export interface ModalControls {
   ref: React.MutableRefObject<ModalHandler | undefined>;
   open: () => void;
   close: () => void;
}

const useModal = () => {
   const modal = useRef<ModalHandler>();

   const open = () => {
      modal.current!.open();
   };

   const close = () => {
      modal.current!.close();
   };

   return {
      ref: modal,
      open: open,
      close: close
   };
};

export default useModal;
