import React, { useEffect, useState } from 'react';
import { Data, WizardResponse } from './model';
import { getSelectList, getSelectListValue, renderSwitchInputForm } from '../helper.tsx';
// import TextFormInput from '../../elements/inputs/TextFormInput';
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

   const [dataLoaderId, setDataLoaderId] = useState<string | undefined>(formSubmit.form.data_loader_id);

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
               f.url_data = '';
               f.data_loader_id = '';
               f.data_loader_parameters_value = {};
               f.domain = '';
               formSubmit.setForm(f);
            } else {
               formSubmit.setForm({
                  uuid: result.selections.uuid,
                  url_data: result.selections.url_data,
                  data_loader_id: result.selections.loader_data!.id,
                  data_loader_parameters_value: result.selections.loader_data!.parameters_value,
                  domain: result.selections.domain,
                  step: result.selections.step
               });
               setDataLoaderId(result.selections.loader_data!.id);
            }
            setData(result.data);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   useEffect(() => {
      if (dataLoaderId !== formSubmit.form.data_loader_id) {
         const f = formSubmit.form;
         f.data_loader_parameters_value = data?.loaders?.find((l) => l.id === f.data_loader_id)?.parameter_default;
         formSubmit.setForm(f);
         setDataLoaderId(formSubmit.form.data_loader_id);
      }
   }, [uuid, formSubmit, data, formSubmit.form.data_loader_id]);

   const dataLoaderSelectList = Object.keys(data).length ? getSelectList(data.loaders!) : [];

   const domainSelectList = Object.keys(data).length ? getSelectList(data.domains!) : [];

   return (
      <>
         <div className="columns is-multiline">
            {/*<div className="column is-half">*/}
            {/*   <TextFormInput*/}
            {/*      name="url_data"*/}
            {/*      label="Data Source Path"*/}
            {/*      value={formSubmit.form.url_data}*/}
            {/*      update={formSubmit.update}*/}
            {/*      errors={formSubmit.errors}*/}
            {/*      placeholder="Data Source Path"*/}
            {/*      isRequired*/}
            {/*   />*/}
            {/*</div>*/}
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
            <div className="column is-half" />
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
               <br />
               {formSubmit.form.data_loader_id && data.loaders && (
                  <div>
                     <label>Parameters info:</label>
                     <p style={{ whiteSpace: 'pre-line' }}>
                        {data.loaders.find((l) => l.id === formSubmit.form.data_loader_id)!.parameter_info}
                     </p>
                     <br />
                     <label>Parameters default values:</label>
                     <p style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                        {JSON.stringify(
                           data.loaders.find((l) => l.id === formSubmit.form.data_loader_id)!.parameter_default,
                           null,
                           2
                        )}
                     </p>
                  </div>
               )}
            </div>
            <div className="column is-half">
               {formSubmit.form.data_loader_id &&
                  formSubmit.form.data_loader_parameters_value &&
                  Object.keys(formSubmit.form.data_loader_parameters_value).map((key) => {
                     return renderSwitchInputForm(
                        typeof formSubmit.form.data_loader_parameters_value[key],
                        key,
                        'data_loader_parameters_value',
                        formSubmit,
                        typeof formSubmit.form.data_loader_parameters_value[key] === 'number' &&
                           !Number.isInteger(formSubmit.form.data_loader_parameters_value[key])
                     );
                  })}
            </div>
         </div>
      </>
   );
};
export default DataStep;
