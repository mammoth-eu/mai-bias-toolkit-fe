import React, { useEffect, useState } from 'react';
import SelectFormInput from '../../elements/inputs/SelectFormInput';
import { Data, WizardResponse } from './model';
import {
   getAttributesDescription,
   getDescription,
   getOptionsDescription,
   getParametersInfo,
   getSelectList,
   getSelectListValue,
   renderSwitchInputForm
} from '../helper.tsx';
import { useAxios } from '../axios/useAxios';
import { AxiosError } from 'axios';
import { useToaster } from '../../elements/toast/useToaster';
import Loader from '../../elements/loader/Loader.tsx';
import Box from '../../elements/box/Box.tsx';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
}

const ModelStep: React.FC<Props> = ({ uuid, formSubmit, step, isLoading, setIsLoading }) => {
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
               f.model_loader_id = '';
               f.model_loader_parameters_value = {};
               formSubmit.setForm(f);
            } else {
               formSubmit.setForm({
                  uuid: result.selections.uuid,
                  model_loader_id: result.selections.loader_model!.id,
                  model_loader_parameters_value: result.selections.loader_model!.parameters_value,
                  step: result.selections.step
               });
               setModelLoaderId(result.selections.loader_model!.id);
            }
            setData(result.data);
            setIsLoading(false);
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
   // The next option should always be the first option to start with, 
   // as it's the easier to run and helps bootstrap new users. COnventiently,
   // this is also the first step, so it guaranteed that we will have it available.
   if(!formSubmit.form.model_loader_id) formSubmit.updateSimple("model_loader_id", "no_model");
   return (
      <>
         {isLoading && <Loader />}
         {!isLoading && (
            <div className="columns is-multiline">
               <div className="column is-half">
                  <SelectFormInput
                     name="model_loader_id"
                     label="Model loader"
                     selectOptions={modelLoaderSelectList}
                     value={getSelectListValue(modelLoaderSelectList, formSubmit.form.model_loader_id)}
                     errors={formSubmit.errors}
                     placeholder="Please select a model loader"
                     updateSelect={formSubmit.updateSimple}
                     isRequired
                     tooltip="Loads pre-trained machine learning models to detect bias."
                  />
                  {formSubmit.form.model_loader_id && data.loaders && (
                     <Box
                        title=""
                        content={getDescription(data.loaders.find((l) => l.id === formSubmit.form.model_loader_id)?.description ?? "")}
                     />
                  )}
                  {/* {formSubmit.form.model_loader_id && data.loaders && (
                     <Box
                        title="Parameters info:"
                        content={getParametersInfo(data.loaders, formSubmit.form.model_loader_id)}
                     />
                  )} */} {/*We are parsing parameter info as tooltips now*/}
               </div>
               <div className="column is-half mt-5">
                  {formSubmit.form.model_loader_parameters_value && (data.loaders!.find((l) => l.id === formSubmit.form.model_loader_id)?.description.includes("path") ?? "") &&
                     <div className="mb-2">
                        <a
                           href="http://kfp-minio.local.exus.ai:8082/minio/data/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="button is-primary is-outlined has-tooltip-bottom"
                           data-tooltip="Open the MinIO browser interface (default credentials: minio,minio123). You can use that to upload local data to the to the toolkit. Click on ... to get a url that you can paste in paths."
                        >
                           Open minio storage
                        </a>
                     </div>

                  }

                  {formSubmit.form.model_loader_parameters_value &&
                     Object.keys(formSubmit.form.model_loader_parameters_value).map((key) => {
                        const loader = data.loaders!.find((l) => l.id === formSubmit.form.model_loader_id);
                        if(!loader) return "";
                        const options = getOptionsDescription(loader!.description)[key];
                        return renderSwitchInputForm(
                           options?.length ? 'select' : typeof formSubmit.form.model_loader_parameters_value[key],
                           key,
                           'model_loader_parameters_value',
                           formSubmit,
                           typeof formSubmit.form.model_loader_parameters_value[key] === 'number' &&
                              !Number.isInteger(formSubmit.form.model_loader_parameters_value[key]),
                           getAttributesDescription(loader!.description)[key] + (loader!.parameter_default[key] ? (
                              ' (default: ' +loader!.parameter_default[key] + ')'):''),
                           options ? [...options, loader!.parameter_default[key]] : undefined
                        );
                     })}
               </div>
            </div>
         )}
      </>
   );
};
export default ModelStep;
