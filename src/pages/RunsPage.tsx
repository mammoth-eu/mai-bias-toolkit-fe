import Portlet from '../components/elements/portlet/Portlet';
import NoDataFound from '../components/elements/NoDataFound';
import { Run, RunResponse } from '../components/business/model';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faICursor } from '@fortawesome/free-solid-svg-icons/faICursor';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { printIsoDate } from '../components/business/helper.tsx';
import { useEffect, useState } from 'react';
import { useAxios } from '../components/business/axios/useAxios';
import { AxiosError } from 'axios';
import { useToaster } from '../components/elements/toast/useToaster';
import Loader from '../components/elements/loader/Loader.tsx';

const RunsPage = () => {
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const [result, setResult] = useState<RunResponse>({ runs: [] });

   const { get } = useAxios<RunResponse>();

   const toaster = useToaster();

   useEffect(() => {
      get(`/wizard/databias/runs`)
         .then((result: RunResponse) => {
            setResult(result);
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   }, []);

   return (
      <>
         <Portlet title="Runs">
            {isLoading && <Loader />}
            {!isLoading && (
               <div className="table-wrapper">
                  <div className="table-container">
                     <table className="table is-fullwidth is-hoverable mb-0 is-mobile">
                        <thead>
                           <tr>
                              <th style={{ width: '300px' }}>Name</th>
                              <th>Group</th>
                              <th style={{ width: '200px' }}>Status</th>
                              <th style={{ width: '200px' }}>Type</th>
                              <th style={{ minWidth: '100px' }}>Start Time</th>
                              <th style={{ minWidth: '100px' }}>End Time</th>
                              <th style={{ width: '10%' }}>&nbsp;</th>
                           </tr>
                        </thead>
                        <tbody>
                           <NoDataFound colspan={7} data={result.runs} label="runs" />
                           {!!result &&
                              result.runs.map((r: Run) => {
                                 return (
                                    <tr key={r.run_id}>
                                       <td>{r.name}</td>
                                       <td>{r.group}</td>
                                       <td>{r.run_status}</td>
                                       <td>{r.run_type}</td>
                                       <td>{printIsoDate(r.run_start_time)}</td>
                                       <td>{printIsoDate(r.run_end_time)}</td>
                                       <td>
                                          <div
                                             className="buttons has-addons is-pulled-right"
                                             style={{ paddingRight: '5px' }}
                                          >
                                             <Link
                                                to={'/runs/run/' + r.uuid}
                                                className="button is-primary is-small is-outlined is-rounded has-tooltip-arrow has-tooltip"
                                                data-tooltip="View"
                                             >
                                                <FontAwesomeIcon icon={faEye} />
                                             </Link>
                                             <button
                                                type={'button'}
                                                className="button is-dark is-small is-outlined is-rounded has-tooltip-arrow has-tooltip"
                                                data-tooltip="Rename"
                                                onClick={() => console.log('rename')}
                                                disabled
                                             >
                                                <FontAwesomeIcon icon={faICursor} />
                                             </button>
                                             <button
                                                type={'button'}
                                                className="button is-danger is-small is-outlined is-rounded has-tooltip-arrow has-tooltip"
                                                data-tooltip="Cancel"
                                                onClick={() => console.log('cancel')}
                                                disabled
                                             >
                                                <FontAwesomeIcon icon={faXmark} />
                                             </button>
                                          </div>
                                       </td>
                                    </tr>
                                 );
                              })}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
         </Portlet>
      </>
   );
};
export default RunsPage;
