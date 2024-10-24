import React, { ReactElement, useImperativeHandle, useState } from 'react';
import useKeyHandler from '../key-handler/key-handler';

interface Props {
   title?: string;
   isOpened?: boolean;
   isLarge?: boolean;
   onClose?: () => void;
   closeButtonName?: string;
   actions?: ReactElement;
   ref: React.Ref<ModalHandler>;
   children: any;
}

export interface ModalHandler {
   open: any;
   close: any;
}

const Modal: React.FunctionComponent<Props> = React.forwardRef(
   (
      { title, isOpened = false, isLarge = false, onClose, closeButtonName = 'Close', actions = null, children },
      ref: React.Ref<ModalHandler>
   ) => {
      const [isActive, setIsActive] = useState(isOpened);

      const close = () => {
         setIsActive(false);
         if (onClose) onClose();
      };

      useKeyHandler(document, 'Escape', 'keydown', close);

      const open = () => {
         setIsActive(true);
      };

      useImperativeHandle(ref, () => {
         return {
            open: open,
            close: close
         };
      });

      return (
         <>
            {isActive ? (
               <div className={'modal is-active' + (isLarge ? ' is-large' : '')}>
                  <div className="modal-background" />
                  <div className="modal-card">
                     <header className="modal-card-head">
                        <p className="modal-card-title">{title}</p>
                        <button type="button" className="delete" aria-label="close" onClick={close} />
                     </header>

                     <React.Fragment>
                        <section className="modal-card-body">{children}</section>
                        <footer className="modal-card-foot">
                           <div className="buttons">
                              <button className={'button'} type="button" onClick={close}>
                                 {closeButtonName}
                              </button>
                              {actions}
                           </div>
                        </footer>
                     </React.Fragment>
                  </div>
               </div>
            ) : null}
         </>
      );
   }
);

export default Modal;
