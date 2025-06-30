import React, { useEffect } from 'react';
import TextFormInput from '../../elements/inputs/TextFormInput';
import { WizardResponse } from './model';
import { useAxios } from '../axios/useAxios';
import { AxiosError } from 'axios';
import { useToaster } from '../../elements/toast/useToaster';
import Loader from '../../elements/loader/Loader.tsx';
import { keycloak } from '../../../main';
import AuthService from '../../../services/AuthService';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
}

const RunStep: React.FC<Props> = ({ uuid, formSubmit, step, isLoading, setIsLoading }) => {
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
                  name: result.selections.name,
                  group: result.selections.group,
                  step: result.selections.step
               });
            }
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   if(!formSubmit.form.group && !formSubmit.form.name && keycloak.authenticated) {
      formSubmit.form.name = 'analysis';
      formSubmit.form.group ||= "created by "+AuthService.getCurrentUser();
   }

   return (
      <>
         {isLoading && <Loader />}
         {!isLoading && (
            <div className="rows is-multiline">
               <div className="column is-half">
                  <TextFormInput
                     name="name"
                     label="Run name"
                     value={formSubmit.form.name}
                     update={formSubmit.update}
                     errors={formSubmit.errors}
                     placeholder="The name of your run"
                     isRequired
                     tooltip="A custom name to identify a specific run within a group."
                  />
               </div>
               <div className="column is-half">
                  <TextFormInput
                     name="group"
                     label="Run group"
                     value={formSubmit.form.group}
                     update={formSubmit.update}
                     errors={formSubmit.errors}
                     placeholder="The broader group of your run"
                     isRequired
                     tooltip="A custom name to identify a group of related runs."
                  />
               </div>
            </div>
         )}
      </>
   );
};
export default RunStep;
