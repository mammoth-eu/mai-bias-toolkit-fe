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

const RunPage = () => {
   const [result, setResult] = useState<RunDetailsResponse>();

   const { uuid } = useParams<{ uuid: string }>();

   const { get } = useAxios<RunDetailsResponse>();

   const toaster = useToaster();

   useEffect(() => {
      get(`/wizard/databias/results/${uuid}`)
         .then((result: RunDetailsResponse) => {
            setResult(result);
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
               onClick={() => {
                  window.open(result!.selections!.run_artifacts![0]);
               }}
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
         {uuid && result && (
            <Portlet title="Run Overview" actions={renderActions()}>
               <OverviewStep uuid={uuid} result={result} />
            </Portlet>
         )}
      </>
   );
};
export default RunPage;
