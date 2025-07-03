import React, { useEffect, useState } from 'react';
import { ResultLink, WizardResponse } from './model';
import TextFormInput from '../../elements/inputs/TextFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import { RunDetailsResponse } from '../model';
import TextAreaFormInput from '../../elements/inputs/TextAreaFormInput';
import Loader from '../../elements/loader/Loader.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';

interface Props {
   uuid: string;
   result?: RunDetailsResponse;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
   setTitle: (text: string) => void;
   artifacts: ResultLink[];
   logs: ResultLink[];
}

const OverviewStep: React.FC<Props> = ({ uuid, result, isLoading, setIsLoading, setTitle, artifacts, logs }) => {
   const [response, setResponse] = useState<WizardResponse | RunDetailsResponse>();
   const { get } = useAxios<WizardResponse>();
   const toaster = useToaster();

   useEffect(() => {
      if (uuid) {
         if (result === undefined) {
            load();
         } else {
            setResponse(result);
         }
      }
   }, [uuid]);

   const load = () => {
      get(`/wizard/databias/overview/${uuid}`)
         .then((result) => {
            setResponse(result);
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   const createAttributesValue = (attributes: string[]) => {
      let value = '';
      attributes.map((a, i) => {
         value = value.concat(a);
         if (i !== attributes.length - 1) {
            value = value.concat(', ');
         }
      });
      return value;
   };
   const normalizeName = (str: string) => str.replace(/[-_]/g, ' ').toLowerCase();

   if(response && setTitle) setTitle(response.selections.name!+", "+response.selections.group!);

   return (
      <>
         {isLoading && !response && <Loader />}
         {!isLoading && response && (
            <div className="rows is-multiline">
               <React.Fragment>
                  {!setTitle && <div className="is-medium is-size-3 has-text-bold ml-2">{response.selections.name!}, {response.selections.group!}</div>}
                  <div className="column mb-0">
                     <p className="is-half is-size-3 has-text-primary">{normalizeName(response.selections.loader_model!.id)}</p>
                     {response.selections.loader_model?.parameters_value &&
                        Object.keys(response.selections.loader_model.parameters_value).length > 0 ? (
                        <table>
                           <tbody>
                              {Object.entries(response.selections.loader_model.parameters_value).map(([key, value]) => (
                              <tr key={key}>
                                 <td className="border pr-4 py-0 font-mono">{key.replace(/_/g, ' ')}</td>
                                 <td className="border pl-4 py-0 font-mono">{value.toString()}</td>
                              </tr>
                              ))}
                           </tbody>
                        </table>
                        ) : (
                        <p className="text-gray-500 italic">No parameters</p>
                     )}
                     {artifacts && artifacts.find(a => normalizeName(a.name).includes(normalizeName(response.selections.loader_model!.id))) && (
                        <button
                           className="button is-secondary is-outlined"
                           onClick={() => window.open(`${window.location.origin}/result?resultUrl=${artifacts.find(a =>normalizeName(a.name).includes(normalizeName(response.selections.loader_model!.id)))!.url}`, '_blank')}
                           rel="noopener noreferrer"
                        ><FontAwesomeIcon icon={faFileLines} />&nbsp; Artifact</button>
                     )}
                     {logs && logs.find(l => normalizeName(l.name).includes(normalizeName(response.selections.loader_model!.id))) && (
                        <button
                           className="button is-secondary is-outlined"
                           onClick={() => window.open(`${window.location.origin}/result?resultUrl=${logs.find(l => normalizeName(l.name).includes(normalizeName(response.selections.loader_model!.id)))!.url}`, '_blank')}
                           rel="noopener noreferrer"
                        ><FontAwesomeIcon icon={faBook} />&nbsp; Log</button>
                     )}
                  </div>



                  <div className="column mb-0">
                     <p className="is-half is-size-3 has-text-primary">
                        {response.selections.loader_data!.id.replace(/_/g, ' ')}
                     </p>
                     {response.selections.loader_data?.parameters_value &&
                        Object.keys(response.selections.loader_data.parameters_value).length > 0 ? (
                        <table>
                           <tbody>
                              <tr key="domain">
                                 <td className="border pr-4 py-0 font-mono">domain</td>
                                 <td className="border pl-4 py-0 font-mono">{response.selections.domain!}</td>
                              </tr>
                              <tr key="attributes">
                                 <td className="border pr-4 py-0 font-mono">protected charcateristics</td>
                                 <td className="border pl-4 py-0 font-mono">{createAttributesValue(response.selections.attributes!)}</td>
                              </tr>
                              {Object.entries(response.selections.loader_data.parameters_value).map(([key, value]) => (
                                 <tr key={key}>
                                    <td className="border pr-4 py-0 font-mono">{key.replace(/_/g, ' ')}</td>
                                    <td className="border pl-4 py-0 font-mono">{value.toString()}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     ) : (<p className="text-gray-500 italic">No parameters</p>)}

                     {artifacts && artifacts.find(a => normalizeName(a.name).includes(normalizeName(response.selections.loader_data!.id))) && (
                        <button
                           className="button is-secondary is-outlined"
                           onClick={() => window.open(`${window.location.origin}/result?resultUrl=${artifacts.find(a =>normalizeName(a.name).includes(normalizeName(response.selections.loader_data!.id)))!.url}`, '_blank')}
                           rel="noopener noreferrer"
                        ><FontAwesomeIcon icon={faFileLines} />&nbsp; Artifact</button>
                     )}
                     {logs && logs.find(l => normalizeName(l.name).includes(normalizeName(response.selections.loader_data!.id))) && (
                        <button
                           className="button is-secondary is-outlined"
                           onClick={() => window.open(`${window.location.origin}/result?resultUrl=${logs.find(l => normalizeName(l.name).includes(normalizeName(response.selections.loader_data!.id)))!.url}`, '_blank')}
                           rel="noopener noreferrer"
                        ><FontAwesomeIcon icon={faBook} />&nbsp; Log</button>
                     )}
                  </div>
                  {response.selections.metrics!.map((m, i) => (
                     <div className="column mb-0" key={i}>
                        <p className="is-half is-size-3 has-text-primary">{m.id.replace(/_/g, ' ')}</p>
                        {m.parameters_value && Object.keys(m.parameters_value).length > 0 ? (
                           <table>
                              <tbody>
                                 {Object.entries(m.parameters_value).map(([key, value]) => (
                                    <tr key={key}>
                                       <td className="border pr-4 py-0 font-mono">{key.replace(/_/g, ' ')}</td>
                                       <td className="border pl-4 py-0 font-mono">{value.toString()}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        ) : (<p className="text-gray-500 italic">No parameters</p>)}
                        {artifacts &&artifacts.find(a => normalizeName(a.name).includes(normalizeName(m!.id))) && (
                           <button
                              className="button is-primary is-outlined"
                              onClick={() => window.open(`${window.location.origin}/result?resultUrl=${artifacts.find(l => normalizeName(l.name).includes(normalizeName(m!.id)))!.url}`, '_blank')}
                              rel="noopener noreferrer"
                           ><FontAwesomeIcon icon={faFileLines} />&nbsp; Results</button>
                        )}
                        {logs && logs.find(l => normalizeName(l.name).includes(normalizeName(m!.id))) && (
                           <button
                              className="button is-secondary is-outlined"
                              onClick={() => window.open(`${window.location.origin}/result?resultUrl=${logs.find(l => normalizeName(l.name).includes(normalizeName(m!.id)))!.url}`, '_blank')}
                              rel="noopener noreferrer"
                           ><FontAwesomeIcon icon={faBook} />&nbsp; Log</button>
                        )}
                     </div>
                  ))}

               </React.Fragment>
            </div>
         )}
      </>
   );
};
export default OverviewStep;
