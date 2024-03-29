import Portlet from '../components/elements/portlet/Portlet';
import NoDataFound from '../components/elements/NoDataFound';
import { RunResponse } from '../components/business/model';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faICursor } from "@fortawesome/free-solid-svg-icons/faICursor";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { printIsoDate } from "../components/business/helper";

const result: RunResponse[] = [
   {
      name: 'Fairness Analysis',
      group: 'Group A',
      status: 'Running',
      type: 'ModelBias',
      start_time: '2024-03-26T11:45:05.112233Z',
      end_time: '2024-03-26T11:47:08.112233Z',
      uuid: '50432-5342534-5235234-53425',
      run_id: '9789879-5342534-76575678-53424'
   }
];

const RunsPage = () => {
   return (
      <>
         <Portlet title="Runs">
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
                        <NoDataFound colspan={7} data={result} label="runs" />
                        {!!result &&
                           result.map((r: RunResponse) => {
                              return (
                                 <tr key={r.run_id}>
                                    <td>{r.name}</td>
                                    <td>{r.group}</td>
                                    <td>{r.status}</td>
                                    <td>{r.type}</td>
                                    <td>{printIsoDate(r.start_time)}</td>
                                    <td>{printIsoDate(r.end_time)}</td>
                                    <td>
                                       <div className="buttons has-addons is-pulled-right" style={{ paddingRight: "5px" }}>
                                          <Link
                                             to={"/runs/run/" + r.run_id}
                                             className="button is-primary is-small is-outlined is-rounded has-tooltip-arrow has-tooltip"
                                             data-tooltip="View"
                                          >
                                             <FontAwesomeIcon icon={faEye} />
                                          </Link>
                                          <button
                                             type={"button"}
                                             className="button is-dark is-small is-outlined is-rounded has-tooltip-arrow has-tooltip"
                                             data-tooltip="Rename"
                                             onClick={() => console.log("rename")}
                                          >
                                             <FontAwesomeIcon icon={faICursor} />
                                          </button>
                                          <button
                                             type={"button"}
                                             className="button is-danger is-small is-outlined is-rounded has-tooltip-arrow has-tooltip"
                                             data-tooltip="Cancel"
                                             onClick={() => console.log("cancel")}
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
         </Portlet>
      </>
   );
};
export default RunsPage;
