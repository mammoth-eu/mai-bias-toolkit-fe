import React, { useEffect } from 'react';
import TextFormInput from '../../elements/inputs/TextFormInput';
import { WizardResponse } from './model';
import { useAxios } from '../axios/useAxios';
import { AxiosError } from 'axios';
import { useToaster } from '../../elements/toast/useToaster';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
}

const ModelStep: React.FC<Props> = ({ uuid, formSubmit, step }) => {

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
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   return (
      <>
         <div className="columns is-multiline">
            <div className="column is-half">
               <TextFormInput
                  name="name"
                  label="Run Name"
                  value={formSubmit.form.name}
                  update={formSubmit.update}
                  errors={formSubmit.errors}
                  placeholder="Run Name"
                  isRequired
               />
            </div>
            <div className="column is-half">
               <TextFormInput
                  name="group"
                  label="Run Group"
                  value={formSubmit.form.group}
                  update={formSubmit.update}
                  errors={formSubmit.errors}
                  placeholder="Run Group"
                  isRequired
               />
            </div>
         </div>
      </>
   );
};
export default ModelStep;
