import Modal from '../../elements/modal/Modal';
import React from 'react';
import { ResultLink } from '../model-steps/model.ts';

interface Props {
   modal: any;
   results: ResultLink[];
   title: string;
}

const RunResultsModal: React.FC<Props> = ({ modal, results, title }) => {
   return (
      <Modal ref={modal.ref} title={title} isLarge>
         <br />
         {results.map((result, index) => {
            const encodedResultUrl = encodeURIComponent(result.url);
            return (
               <>
                  <p key={index}>
                     <button
                        onClick={() =>
                           window.open(`${window.location.origin}/result?resultUrl=${encodedResultUrl}`, '_blank')
                        }
                        className="button is-ghost has-text-weight-bold"
                     >
                        {result.name}
                     </button>
                  </p>
               </>
            );
         })}
      </Modal>
   );
};
export default RunResultsModal;
