import Modal from '../../elements/modal/Modal';
import React from 'react';

interface Props {
   modal: any;
   results: string[];
}

const CreateUserModal: React.FC<Props> = ({ modal, results }) => {
   return (
      <Modal ref={modal.ref} title={'Results'} isLarge>
         <br />
         {results.map((result, index) => {
            return (
               <>
                  <p key={index}>
                     <b>
                        <a href={result} target="_blank">
                           {result}
                        </a>
                     </b>
                  </p>
                  <br />
               </>
            );
         })}
      </Modal>
   );
};
export default CreateUserModal;
