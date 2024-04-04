import React, { useEffect, useState } from 'react';
import { Data, WizardResponse } from './model';
import { getSelectList, getSelectListValue } from '../helper';
import TextFormInput from '../../elements/inputs/TextFormInput';
import SelectFormInput from '../../elements/inputs/SelectFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
}

const DataStep: React.FC<Props> = ({ uuid, formSubmit, step }) => {
   const [data, setData] = useState<Data>({});

   const { get } = useAxios<WizardResponse>();

   const toaster = useToaster();

   useEffect(() => {
      if (uuid) {
         load();
      }
   }, [uuid]);

   const load = () => {
      get(`/wizard/databias/data/${uuid}`)
         .then((result) => {
            if (result.selections.step < step) {
               const f = formSubmit.form;
               f.uuid = uuid;
               formSubmit.setForm(f);
            } else {
               formSubmit.setForm({
                  uuid: result.selections.uuid,
                  url_data: result.selections.url_data,
                  data_loader_id: result.selections.loader_data!.id,
                  data_loader_parameters_value:
                     JSON.stringify(result.selections.loader_data!.parameters_value) === '{}'
                        ? ''
                        : JSON.stringify(result.selections.loader_data!.parameters_value),
                  domain: result.selections.domain,
                  step: result.selections.step
               });
            }
            setData(result.data);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
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
                     {JSON.stringify(
                        data.loaders.find((l) => l.id === formSubmit.form.data_loader_id)!.parameter_default
                     )}
                  </p>
               </div>
            )}
         </div>
      </>
   );
};
export default DataStep;
