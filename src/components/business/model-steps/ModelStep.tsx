import React, { useEffect, useState } from 'react';
import SelectFormInput from '../../elements/inputs/SelectFormInput';
import { Data, WizardResponse } from './model';
import { getSelectList, getSelectListValue, renderSwitchInputForm } from '../helper.tsx';
import { useAxios } from '../axios/useAxios';
import { AxiosError } from 'axios';
import { useToaster } from '../../elements/toast/useToaster';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
}

const ModelStep: React.FC<Props> = ({ uuid, formSubmit, step }) => {
   const [data, setData] = useState<Data>({});

   const [modelLoaderId, setModelLoaderId] = useState<string | undefined>(formSubmit.form.model_loader_id);

   const { get } = useAxios<WizardResponse>();

   const toaster = useToaster();

   useEffect(() => {
      if (uuid) {
         load();
      }
   }, [uuid]);

   const load = () => {
      get(`/wizard/databias/model/${uuid}`)
         .then((result) => {
            if (result.selections.step < step) {
               const f = formSubmit.form;
               f.uuid = uuid;
               formSubmit.setForm(f);
            } else {
               formSubmit.setForm({
                  uuid: result.selections.uuid,
                  url_model: result.selections.url_model,
                  model_loader_id: result.selections.loader_model!.id,
                  model_loader_parameters_value: result.selections.loader_model!.parameters_value,
                  step: result.selections.step
               });
               setModelLoaderId(result.selections.loader_model!.id);
            }
            setData(result.data);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   useEffect(() => {
      if (modelLoaderId !== formSubmit.form.model_loader_id) {
         const f = formSubmit.form;
         f.model_loader_parameters_value = data?.loaders?.find((l) => l.id === f.model_loader_id)?.parameter_default;
         formSubmit.setForm(f);
         setModelLoaderId(formSubmit.form.model_loader_id);
      }
   }, [uuid, formSubmit, data, formSubmit.form.model_loader_id]);

   const modelLoaderSelectList = Object.keys(data).length ? getSelectList(data.loaders!) : [];

   return (
      <>
         <div className="columns is-multiline">
            {/*<div className="column is-half">*/}
            {/*   <TextFormInput*/}
            {/*      name="url_model"*/}
            {/*      label="Model Source Path"*/}
            {/*      value={formSubmit.form.url_model}*/}
            {/*      update={formSubmit.update}*/}
            {/*      errors={formSubmit.errors}*/}
            {/*      placeholder="Model Source Path"*/}
            {/*      isRequired*/}
            {/*   />*/}
            {/*</div>*/}
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
               <br />
               {formSubmit.form.model_loader_id && data.loaders && (
                  <div>
                     <label>Parameters info:</label>
                     <p style={{ whiteSpace: 'pre-line' }}>
                        {data.loaders.find((l) => l.id === formSubmit.form.model_loader_id)!.parameter_info}
                     </p>
                     <br />
                     <label>Parameters default values:</label>
                     <p style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                        {JSON.stringify(
                           data.loaders.find((l) => l.id === formSubmit.form.model_loader_id)!.parameter_default,
                           null,
                           2
                        )}
                     </p>
                  </div>
               )}
            </div>
            <div className="column is-half">
               {formSubmit.form.model_loader_parameters_value &&
                  Object.keys(formSubmit.form.model_loader_parameters_value).map((key) => {
                     return renderSwitchInputForm(
                        typeof formSubmit.form.model_loader_parameters_value[key],
                        key,
                        'model_loader_parameters_value',
                        formSubmit,
                        typeof formSubmit.form.model_loader_parameters_value[key] === 'number' &&
                           !Number.isInteger(formSubmit.form.model_loader_parameters_value[key])
                     );
                  })}
            </div>
         </div>
      </>
   );
};
export default ModelStep;
