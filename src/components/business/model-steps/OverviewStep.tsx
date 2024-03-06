import React, { useEffect, useState } from 'react';
import { WizardResponse } from './model';
import TextFormInput from '../../elements/inputs/TextFormInput';

interface Props {
   uuid: string;
}

const result: WizardResponse = {
   selections: {
      uuid: '61a3bbc0-8d52-4f05-8246-5c9f600e7ba7',
      name: 'Fairness Analysis',
      group: 'Group A',
      url_data: 'https://www.sampleurl.com',
      url_model: 'https://www.samplemodelurl.com',
      attributes: ['age', 'gender'],
      data_loader: {
         id: 'csv',
         parameters_value: '{"on_bad_lines" : "skip", "delimiter" : ";"}'
      },
      model_loader: {
         id: 'onnx',
         parameters_value: ''
      },
      domain: 'finance',
      metrics: [
         {
            id: 'simple',
            parameters_value: ''
         }
      ]
   },
   data: {}
};

const OverviewStep: React.FC<Props> = ({ uuid }) => {
   const [response, setResponse] = useState<WizardResponse>();

   useEffect(() => {
      if (uuid) {
         load();
      }
   }, [uuid]);

   const load = () => {
      // ToDo integrate with backend for getting the result
      setResponse(result);
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
                        value={response.selections.model_loader!.id}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="model_loader_parameters_value"
                        label="Model Loader Parameters Value"
                        value={response.selections.model_loader!.parameters_value}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="data_loader_id"
                        label="Data Loader"
                        value={response.selections.data_loader!.id}
                        disabled
                     />
                  </div>
                  <div className="column is-half">
                     <TextFormInput
                        name="data_loader_parameters_value"
                        label="Data Loader Parameters Value"
                        value={response.selections.data_loader!.parameters_value}
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
                              <TextFormInput
                                 name="metric_parameters_value"
                                 label={`Metric ${i + 1} Parameters Value`}
                                 value={m.parameters_value}
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
