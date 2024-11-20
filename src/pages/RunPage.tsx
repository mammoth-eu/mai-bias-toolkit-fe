import { useParams } from 'react-router-dom';
import OverviewStep from '../components/business/model-steps/OverviewStep';
import Portlet from '../components/elements/portlet/Portlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { useAxios } from '../components/business/axios/useAxios';
import { RunDetailsResponse } from '../components/business/model';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useToaster } from '../components/elements/toast/useToaster';
import RunResultsModal from '../components/business/run/RunResultsModal.tsx';
import useModal from '../components/elements/modal/useModal.ts';
import Loader from '../components/elements/loader/Loader.tsx';

const RunPage = () => {
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const [result, setResult] = useState<RunDetailsResponse>();

   const { uuid } = useParams<{ uuid: string }>();

   const { get } = useAxios<RunDetailsResponse>();

   const toaster = useToaster();

   const runResultModal = useModal();

   useEffect(() => {
      get(`/wizard/databias/results/${uuid}`)
         .then((result: RunDetailsResponse) => {
            setResult(result);
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   }, [uuid]);

   const renderActions = () => {
      return (
         <div className="buttons">
            <button
               className="button is-primary is-outlined"
               onClick={runResultModal.open}
               disabled={!result || isLoading}
            >
               <span>
                  <FontAwesomeIcon icon={faFileLines} />
                  &nbsp;Results
               </span>
            </button>
         </div>
      );
   };

   return (
      <>
         <Portlet title="Run Overview" actions={renderActions()}>
            {isLoading && <Loader />}
            {!isLoading && uuid && result && (
               <OverviewStep uuid={uuid} result={result} isLoading={isLoading} setIsLoading={setIsLoading} />
            )}
         </Portlet>
         {!isLoading && result && <RunResultsModal modal={runResultModal} results={result.selections.run_artifacts!} />}
      </>
   );
};
export default RunPage;
