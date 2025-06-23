import Modal from '../../elements/modal/Modal';
import React from 'react';

interface Props {
   modal: any;
   text: string;
   title: string;
}

const RunStatusModal: React.FC<Props> = ({ modal, text, title }) => {
   return (
      <Modal ref={modal.ref} title={title} isLarge>
         <div style={{ height: '100vh', width: '100%' }}>
            <iframe srcDoc={text} title="Status" width="100%" height="100%" style={{ border: 'none' }} />
         </div>
      </Modal>
   );
};
export default RunStatusModal;
