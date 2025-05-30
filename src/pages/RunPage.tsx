import { useParams } from 'react-router-dom';
import OverviewStep from '../components/business/model-steps/OverviewStep';
import Portlet from '../components/elements/portlet/Portlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { useAxios } from '../components/business/axios/useAxios';
import { RunDetailsResponse } from '../components/business/model';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useToaster } from '../components/elements/toast/useToaster';
import RunResultsModal from '../components/business/run/RunResultsModal.tsx';
import useModal from '../components/elements/modal/useModal.ts';
import Loader from '../components/elements/loader/Loader.tsx';
import { ResultLink } from '../components/business/model-steps/model.ts';

const RunPage = () => {
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const [result, setResult] = useState<RunDetailsResponse>();

   const { uuid } = useParams<{ uuid: string }>();

   const { get } = useAxios<RunDetailsResponse>();

   const toaster = useToaster();

   const runResultModal = useModal();

   const runLogModal = useModal();

   useEffect(() => {
      get(`/wizard/databias/resultlinks/${uuid}`)
         .then((result: RunDetailsResponse) => {
            setResult(result);
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   }, [uuid]);

   const renderActions = () => {
      const noArtifactResult = !!result && !filterOnType(result.selections.result_links!, 'artifact').length;
      const noLogResult = !!result && !filterOnType(result.selections.result_links!, 'log').length;
      return (
         <div className="buttons">
            <button
               className="button is-primary is-outlined"
               onClick={runResultModal.open}
               disabled={!result || isLoading || noArtifactResult}
            >
               <span>
                  <FontAwesomeIcon icon={faFileLines} />
                  &nbsp;Results
               </span>
            </button>
            <button
               className="button is-primary is-outlined"
               onClick={runLogModal.open}
               disabled={!result || isLoading || noLogResult}
            >
               <span>
                  <FontAwesomeIcon icon={faBook} />
                  &nbsp;Logs
               </span>
            </button>
         </div>
      );
   };

   const filterOnType = (resultLinks: ResultLink[], type: string) => {
      return resultLinks.filter((item) => item.type === type);
   };

   return (
      <>
         <Portlet title="Run Overview" actions={renderActions()}>
            {isLoading && <Loader />}
            {!isLoading && uuid && result && (
               <OverviewStep uuid={uuid} result={result} isLoading={isLoading} setIsLoading={setIsLoading} />
            )}
         </Portlet>
         {!isLoading && result && (
            <RunResultsModal
               modal={runResultModal}
               results={filterOnType(result.selections.result_links!, 'artifact')}
               title={'Results'}
            />
         )}
         {!isLoading && result && (
            <RunResultsModal
               modal={runLogModal}
               results={filterOnType(result.selections.result_links!, 'log')}
               title={'Logs'}
            />
         )}
      </>
   );
};
export default RunPage;
