import React, { useEffect, useState } from 'react';
import { WizardResponse } from './model';
import TextFormInput from '../../elements/inputs/TextFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import { RunDetailsResponse } from '../model';
import TextAreaFormInput from '../../elements/inputs/TextAreaFormInput';
import Loader from '../../elements/loader/Loader.tsx';

interface Props {
   uuid: string;
   result?: RunDetailsResponse;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
}

const OverviewStep: React.FC<Props> = ({ uuid, result, isLoading, setIsLoading }) => {
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

   return (
      <>
         {isLoading && !response && <Loader />}
         {!isLoading && response && (
            <div className="rows is-multiline">
               <React.Fragment>
                  <div className="column is-half">
                     <TextFormInput name="name" label="Run name" value={response.selections.name!} disabled />
                  </div>
                  <div className="column is-half">
                     <TextFormInput name="group" label="Run group" value={response.selections.group!} disabled />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="model_loader_id"
                        label="Model loader"
                        value={response.selections.loader_model!.id}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextAreaFormInput
                        name="model_loader_parameters_value"
                        label="Model parameters"
                        value={
                           JSON.stringify(response.selections.loader_model!.parameters_value) === '{}'
                              ? ''
                              : JSON.stringify(response.selections.loader_model!.parameters_value, null, 2)
                        }
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="data_loader_id"
                        label="Data loader"
                        value={response.selections.loader_data!.id}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextAreaFormInput
                        name="data_loader_parameters_value"
                        label="Data parameters"
                        value={
                           JSON.stringify(response.selections.loader_data!.parameters_value) === '{}'
                              ? ''
                              : JSON.stringify(response.selections.loader_data!.parameters_value, null, 2)
                        }
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput name="domain" label="Domain" value={response.selections.domain!} disabled />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="attributes"
                        label="Protected characteristics"
                        value={createAttributesValue(response.selections.attributes!)}
                        disabled
                     />
                  </div>
                  {response.selections.metrics!.map((m, i) => {
                     return (
                        <React.Fragment key={i + 1}>
                           <div className="column is-half">
                              <TextFormInput name="metric_id" label={`Metric ${i + 1}`} value={m.id} disabled />
                           </div>
                           <div className="column is-half">
                              <TextAreaFormInput
                                 name="metric_parameters_value"
                                 label={`Analysis ${i + 1} parameters`}
                                 value={
                                    JSON.stringify(m.parameters_value) === '{}'
                                       ? ''
                                       : JSON.stringify(m.parameters_value, null, 2)
                                 }
                                 disabled
                              />
                           </div>
                        </React.Fragment>
                     );
                  })}
               </React.Fragment>
            </div>
         )}
      </>
   );
};
export default OverviewStep;
