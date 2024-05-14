import React, { useEffect, useState } from 'react';
import { WizardResponse } from './model';
import TextFormInput from '../../elements/inputs/TextFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import { RunDetailsResponse } from '../model';
import TextAreaFormInput from "../../elements/inputs/TextAreaFormInput";

interface Props {
   uuid: string;
   result?: RunDetailsResponse;
}

const OverviewStep: React.FC<Props> = ({ uuid, result }) => {
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
         {response && (
            <div className="columns is-multiline">
               <React.Fragment>
                  <div className="column is-half">
                     <TextFormInput name="name" label="Name" value={response.selections.name!} disabled />
                  </div>
                  <div className="column is-half">
                     <TextFormInput name="group" label="Group" value={response.selections.group!} disabled />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="url_model"
                        label="Model Source Path"
                        value={response.selections.url_model!}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="url_data"
                        label="Data Source Path"
                        value={response.selections.url_data!}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="model_loader_id"
                        label="Model Loader"
                        value={response.selections.loader_model!.id}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextAreaFormInput
                        name="model_loader_parameters_value"
                        label="Model Loader Parameters Value"
                        value={
                           JSON.stringify(response.selections.loader_model!.parameters_value) === '{}'
                              ? ''
                              : JSON.stringify(response.selections.loader_model!.parameters_value)
                        }
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="data_loader_id"
                        label="Data Loader"
                        value={response.selections.loader_data!.id}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextAreaFormInput
                        name="data_loader_parameters_value"
                        label="Data Loader Parameters Value"
                        value={
                           JSON.stringify(response.selections.loader_data!.parameters_value) === '{}'
                              ? ''
                              : JSON.stringify(response.selections.loader_data!.parameters_value)
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
                        label="Features and Protected Characteristics"
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
                                 label={`Metric ${i + 1} Parameters Value`}
                                 value={
                                    JSON.stringify(m.parameters_value) === '{}'
                                       ? ''
                                       : JSON.stringify(m.parameters_value)
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
