import { useParams } from 'react-router-dom';
import OverviewStep from '../components/business/model-steps/OverviewStep';
import Portlet from '../components/elements/portlet/Portlet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { useAxios } from '../components/business/axios/useAxios';
import { RunDetailsResponse } from '../components/business/model';
import { useEffect, useState, useRef } from 'react';
import { AxiosError } from 'axios';
import { useToaster } from '../components/elements/toast/useToaster';
import RunResultsModal from '../components/business/run/RunResultsModal.tsx';
import useModal from '../components/elements/modal/useModal.ts';
import Loader from '../components/elements/loader/Loader.tsx';
import { ResultLink } from '../components/business/model-steps/model.ts';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import RunStatusModal from '../components/business/run/RunStatusModal.tsx';

function ShadowHtml({ html }: { html: string }) {
   // we can use this if we want to place ste status directly within results
   const containerRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      if (!containerRef.current) return;
      const shadowRoot = containerRef.current.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
         <div style="all: initial;">
            ${html.replace("Run Status", "")} 
         </div>
      `;
   }, [html]);
   return <div ref={containerRef} style={{ width: '50%', height: '100%' }} />;
}



const RunPage = () => {
   const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(true);
   const [status, setStatus] = useState<string>('');
   const [isLoadingResult, setIsLoadingResult] = useState<boolean>(true);
   const [result, setResult] = useState<RunDetailsResponse>();
   const { uuid } = useParams<{ uuid: string }>();
   const { getHTML } = useAxios<string>();
   const { get } = useAxios<RunDetailsResponse>();
   const toaster = useToaster();
   // const runResultModal = useModal();
   // const runLogModal = useModal();
   const statusModal = useModal();


   useEffect(() => {
      const interval = setInterval(() => {
         get(`/wizard/databias/resultlinks/${uuid}`)
            .then((result: RunDetailsResponse) => {
               setResult(result);
               setIsLoadingResult(false);
            })
            .catch((e: AxiosError) => {
               toaster.error(e.message);
            });

         getHTML(`/wizard/databias/status/${uuid}`)
            .then((result: string) => {
               setStatus(result);
               setIsLoadingStatus(false);
            })
            .catch((e: AxiosError) => {
               toaster.error(e.message);
            });
      }, 2000);
      return () => clearInterval(interval);
   }, [uuid]);


   const renderActions = () => {
      //      const noArtifactResult = !!result && !filterOnType(result.selections.result_links!, 'artifact').length;
      //      const noLogResult = !!result && !filterOnType(result.selections.result_links!, 'log').length;
      return (

         <button
               className="button is-primary is-outlined"
               onClick={statusModal.open}
               disabled={!status || isLoadingStatus}
            >
               <FontAwesomeIcon icon={faCircleInfo} />
               &nbsp;Runner status
         </button>
         // <div className="buttons">
         //    <button
         //       className="button is-primary is-outlined"
         //       onClick={statusModal.open}
         //       disabled={!status || isLoadingStatus}
         //    >
         //       <FontAwesomeIcon icon={faCircleInfo} />
         //       &nbsp;Status
         //    </button>
         //    <button
         //       className="button is-primary is-outlined"
         //       onClick={runResultModal.open}
         //       disabled={!result || isLoadingResult /*|| noArtifactResult*/}
         //    >
         //       <span>
         //          <FontAwesomeIcon icon={faFileLines} />
         //          &nbsp;Raw
         //       </span>
         //    </button>
         //    <button
         //       className="button is-primary is-outlined"
         //       onClick={runLogModal.open}
         //       disabled={!result || isLoadingResult /*|| noLogResult*/}
         //    >
         //       <span>
         //          <FontAwesomeIcon icon={faBook} />
         //          &nbsp;Logs
         //       </span>
         //    </button>
         // </div>
      );
   };

   const filterOnType = (resultLinks: ResultLink[], type: string) => {return resultLinks.filter((item) => item.type === type);};
   const [title, setTitle] = useState("Run overview");
   return (
      <>
         <Portlet title={title} actions={renderActions()}>
            {isLoadingResult && <Loader />}
            {!isLoadingResult && uuid && result && (
               <OverviewStep
                  uuid={uuid}
                  result={result}
                  isLoading={isLoadingResult}
                  setIsLoading={setIsLoadingResult}
                  setTitle={setTitle}
                  artifacts={result?filterOnType(result.selections.result_links!, 'artifact'):[]}
                  logs={result?filterOnType(result.selections.result_links!, 'log'):[]}
               />
            )}
            {/* {status && <ShadowHtml html={status} />}
            {!status && (
               <div className='column button is-primary is-outlined is-medium is-loading'></div>
            )} */}
         </Portlet>
         {!isLoadingStatus && status && <RunStatusModal modal={statusModal} text={status} title="Run status" />} 
         {/* {!isLoadingResult && result && (
            <RunResultsModal
               modal={runResultModal}
               results={filterOnType(result.selections.result_links!, 'artifact')}
               title={'Raw'}
            />
         )}
         {!isLoadingResult && result && (
            <RunResultsModal
               modal={runLogModal}
               results={filterOnType(result.selections.result_links!, 'log')}
               title={'Logs'}
            />
         )} */}
      </>
   );
};
export default RunPage;
