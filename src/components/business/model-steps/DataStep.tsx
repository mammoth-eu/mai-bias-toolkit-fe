import React, { useEffect, useState } from 'react';
import { Data, WizardResponse } from './model';
import { getSelectList, getSelectListValue } from '../helper';
import TextFormInput from '../../elements/inputs/TextFormInput';
import SelectFormInput from '../../elements/inputs/SelectFormInput';

const result: WizardResponse = {
   selections: {
      // uuid: '61a3bbc0-8d52-4f05-8246-5c9f600e7ba7',
      // url_data: '/src/test1',
      // data_loader: {
      //    id: 'csv',
      //    parameters_value: '{"on_bad_lines" : "skip", "delimiter" : ";"}'
      // },
      // domain: 'financial'
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

const DataStep: React.FC<Props> = ({ uuid, formSubmit }) => {
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
            url_data: result.selections.url_data,
            data_loader_id: result.selections.data_loader!.id,
            data_loader_parameters_value: result.selections.data_loader!.parameters_value,
            domain: result.selections.domain
         });
      }
      setData(result.data);
   };

   const dataLoaderSelectList = Object.keys(data).length ? getSelectList(data.loaders!) : [];

   const domainSelectList = Object.keys(data).length ? getSelectList(data.domains!) : [];

   return (
      <>
         <div className="columns is-multiline">
            <div className="column is-half">
               <TextFormInput
                  name="url_data"
                  label="Data Source Path"
                  value={formSubmit.form.url_data}
                  update={formSubmit.update}
                  errors={formSubmit.errors}
                  placeholder="Data Source Path"
                  isRequired
               />
            </div>
            <div className="column is-half">
               <SelectFormInput
                  name="data_loader_id"
                  label="Data Loader"
                  hasEmpty
                  selectOptions={dataLoaderSelectList}
                  value={getSelectListValue(dataLoaderSelectList, formSubmit.form.data_loader_id)}
                  errors={formSubmit.errors}
                  placeholder="Data Loader"
                  updateSelect={formSubmit.updateSimple}
                  isRequired
               />
               {formSubmit.form.data_loader_id && data.loaders && (
                  // <label className="label">Description:</label>
                  <p style={{ whiteSpace: 'pre-line' }}>
                     {data.loaders.find((l) => l.id === formSubmit.form.data_loader_id)!.description}
                  </p>
               )}
            </div>
            <div className="column is-half">
               <SelectFormInput
                  name="domain"
                  label="Domain"
                  hasEmpty
                  selectOptions={domainSelectList}
                  value={getSelectListValue(domainSelectList, formSubmit.form.domain)}
                  errors={formSubmit.errors}
                  placeholder="Domain"
                  updateSelect={formSubmit.updateSimple}
                  isRequired
               />
            </div>
            {formSubmit.form.data_loader_id && data.loaders && (
               <div className="column is-half">
                  <TextFormInput
                     name="data_loader_parameters_value"
                     label="Data Loader Parameters"
                     value={formSubmit.form.data_loader_parameters_value}
                     update={formSubmit.update}
                     errors={formSubmit.errors}
                     placeholder="Data Loader Parameters"
                  />
                  <label className="label">Parameters info:</label>
                  <p style={{ whiteSpace: 'pre-line' }}>
                     {data.loaders.find((l) => l.id === formSubmit.form.data_loader_id)!.parameter_info}
                  </p>
                  <label className="label">Parameters default values:</label>
                  <p style={{ whiteSpace: 'pre-line' }}>
                     {data.loaders.find((l) => l.id === formSubmit.form.data_loader_id)!.parameter_default}
                  </p>
               </div>
            )}
         </div>
      </>
   );
};
export default DataStep;
