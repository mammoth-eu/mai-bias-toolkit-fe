import React, { useEffect, useState } from 'react';
import TextFormInput from '../../elements/inputs/TextFormInput';
import SelectFormInput from '../../elements/inputs/SelectFormInput';
import { Data, WizardResponse } from './model';
import { getSelectList, getSelectListValue } from '../helper';

const result: WizardResponse = {
   selections: {
      // uuid: '61a3bbc0-8d52-4f05-8246-5c9f600e7ba7',
      // name: 'test1',
      // group: 'test1',
      // url_model: '/src/test1',
      // model_loader: {
      //    id: 'csv',
      //    parameters_value: '{"on_bad_lines" : "skip", "delimiter" : ";"}'
      // }
   },
   data: {
      attributes: ['age', 'gender', 'race', 'religion'],
      loaders: [
         {
            id: 'csv',
            name: 'CSV Loader',
            description: 'Loads a CSV dataset',
            parameter_info:
               'on_bad_lines, supported values {‘error’, ‘warn’, ‘skip’} default \'skip\'\n delimiter, default \',\'.\n Please note that the options should be provided in the following form: {"on_bad_lines" : "skip", "delimiter" : ";"}',
            parameter_default: '{"on_bad_lines" : "skip", "delimiter" : ";"}'
         }
      ],
      domains: [
         {
            id: 'financial',
            name: 'Financial'
         }
      ],
      metrics: [
         {
            id: 'simple',
            name: 'Simple Metric',
            description: 'A metric that does simple bias analysis',
            parameter_info: 'No parameters',
            parameter_default: '{}'
         }
      ]
   }
};

interface Props {
   uuid: string;
   formSubmit: any;
}

const ModelStep: React.FC<Props> = ({ uuid, formSubmit }) => {
   const [data, setData] = useState<Data>({});

   useEffect(() => {
      if (uuid) {
         load();
      }
   }, [uuid]);

   const load = () => {
      // ToDo integrate with backend for getting the result
      if (Object.keys(result.selections).length === 0) {
         const f = formSubmit.form;
         f.uuid = uuid;
         formSubmit.setForm(f);
      } else {
         formSubmit.setForm({
            uuid: result.selections.uuid,
            name: result.selections.name,
            group: result.selections.group,
            url_model: result.selections.url_model,
            model_loader_id: result.selections.model_loader!.id,
            model_loader_parameters_value: result.selections.model_loader!.parameters_value
         });
      }
      setData(result.data);
   };

   const modelLoaderSelectList = Object.keys(data).length ? getSelectList(data.loaders!) : [];

   return (
      <>
         <div className="columns is-multiline">
            <div className="column is-half">
               <TextFormInput
                  name="name"
                  label="Name"
                  value={formSubmit.form.name}
                  update={formSubmit.update}
                  errors={formSubmit.errors}
                  placeholder="Name"
                  isRequired
               />
            </div>
            <div className="column is-half">
               <TextFormInput
                  name="group"
                  label="Group"
                  value={formSubmit.form.group}
                  update={formSubmit.update}
                  errors={formSubmit.errors}
                  placeholder="Group"
                  isRequired
               />
            </div>
            <div className="column is-half">
               <TextFormInput
                  name="url_model"
                  label="Model Source Path"
                  value={formSubmit.form.url_model}
                  update={formSubmit.update}
                  errors={formSubmit.errors}
                  placeholder="Model Source Path"
                  isRequired
               />
            </div>
            <div className="column is-half">
               <SelectFormInput
                  name="model_loader_id"
                  label="Model Loader"
                  hasEmpty
                  selectOptions={modelLoaderSelectList}
                  value={getSelectListValue(modelLoaderSelectList, formSubmit.form.model_loader_id)}
                  errors={formSubmit.errors}
                  placeholder="Model Loader"
                  updateSelect={formSubmit.updateSimple}
                  isRequired
               />
               {formSubmit.form.model_loader_id && data.loaders && (
                  // <label className="label">Description:</label>
                  <p style={{ whiteSpace: 'pre-line' }}>
                     {data.loaders.find((l) => l.id === formSubmit.form.model_loader_id)!.description}
                  </p>
               )}
            </div>
            <div className="column is-half"></div>
            {formSubmit.form.model_loader_id && data.loaders && (
               <div className="column is-half">
                  <TextFormInput
                     name="model_loader_parameters_value"
                     label="Model Loader Parameters"
                     value={formSubmit.form.model_loader_parameters_value}
                     update={formSubmit.update}
                     errors={formSubmit.errors}
                     placeholder="Model Loader Parameters"
                  />
                  <label className="label">Parameters info:</label>
                  <p style={{ whiteSpace: 'pre-line' }}>
                     {data.loaders.find((l) => l.id === formSubmit.form.model_loader_id)!.parameter_info}
                  </p>
                  <label className="label">Parameters default values:</label>
                  <p style={{ whiteSpace: 'pre-line' }}>
                     {data.loaders.find((l) => l.id === formSubmit.form.model_loader_id)!.parameter_default}
                  </p>
               </div>
            )}
         </div>
      </>
   );
};
export default ModelStep;
