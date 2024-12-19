import React, { useEffect, useState } from 'react';
import { Data, WizardResponse } from './model';
import {
   getDescription,
   getAttributesDescription,
   getParametersInfo,
   getSelectList,
   getSelectListValue,
   renderSwitchInputForm
} from '../helper.tsx';
import SelectFormInput from '../../elements/inputs/SelectFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import Loader from '../../elements/loader/Loader.tsx';
import Box from '../../elements/box/Box.tsx';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
}

const DataStep: React.FC<Props> = ({ uuid, formSubmit, step, isLoading, setIsLoading }) => {
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
               f.data_loader_id = '';
               f.data_loader_parameters_value = {};
               f.domain = '';
               formSubmit.setForm(f);
            } else {
               formSubmit.setForm({
                  uuid: result.selections.uuid,
                  data_loader_id: result.selections.loader_data!.id,
                  data_loader_parameters_value: result.selections.loader_data!.parameters_value,
                  domain: result.selections.domain,
                  step: result.selections.step
               });
               setDataLoaderId(result.selections.loader_data!.id);
            }
            setData(result.data);
            setIsLoading(false);
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
         {isLoading && <Loader />}
         {!isLoading && (
            <div className="columns is-multiline">
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
                     tooltip="The field or area where the model is being applied."
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
                     tooltip="Collects and prepares data for bias detection."
                  />
                  {formSubmit.form.data_loader_id && data.loaders && (
                     <Box
                        title="Description:"
                        content={getDescription(
                           data.loaders.find((l) => l.id === formSubmit.form.data_loader_id)!.description
                        )}
                     />
                  )}
                  {formSubmit.form.data_loader_id && data.loaders && (
                     <Box
                        title="Parameters info:"
                        content={getParametersInfo(data.loaders, formSubmit.form.data_loader_id)}
                     />
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
                              !Number.isInteger(formSubmit.form.data_loader_parameters_value[key]),
                           getAttributesDescription(
                              data.loaders!.find((l) => l.id === formSubmit.form.data_loader_id)!.description
                           )[key] +
                              ' (default: ' +
                              formSubmit.form.data_loader_parameters_value[key] +
                              ')'
                        );
                     })}
               </div>
            </div>
         )}
      </>
   );
};
export default DataStep;
