import React, { useEffect, useState } from 'react';
import { SelectionsForm, WizardResponse } from './model';
import BooleanFormInput from '../../elements/inputs/BooleanFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
}

const FeaturesAndProtectedCharacteristicsStep: React.FC<Props> = ({ uuid, formSubmit, step }) => {
   const [formLength, setFormLength] = useState<number>(2);

   const { get } = useAxios<WizardResponse>();

   const toaster = useToaster();

   useEffect(() => {
      if (uuid) {
         load();
      }
   }, [uuid]);

   const load = () => {
      get(`/wizard/databias/attributes/${uuid}`)
         .then((result) => {
            if (result.selections.step < step) {
               const f = formSubmit.form;
               f.uuid = uuid;
               createInitForm(result.data.attributes!, f);
               formSubmit.setForm(f);
               setFormLength(Object.keys(f).length);
            } else {
               const f = formSubmit.form;
               f.uuid = result.selections.uuid;
               createValuesForm(result.selections.attributes!, result.data.attributes!, f);
               f.step = result.selections.step;
               formSubmit.setForm(f);
               setFormLength(Object.keys(f).length);
            }
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   const createInitForm = (attributes: string[], form: SelectionsForm) => {
      Object.keys(form).map((key) => {
         key !== 'uuid' && key !== 'step' && delete form[key];
      });
      attributes.map((a) => {
         form[a] = false;
      });
   };

   const createValuesForm = (selectionAttributes: string[], attributes: string[], form: SelectionsForm) => {
      Object.keys(form).map((key) => {
         key !== 'uuid' && key !== 'step' && delete form[key];
      });
      attributes.map((a) => {
         form[a] = selectionAttributes.indexOf(a) > -1;
      });
   };

   return (
      <>
         <div className="columns is-multiline">
            {formLength > 2 &&
               Object.keys(formSubmit.form).map((key) => {
                  return (
                     key !== 'uuid' &&
                     key !== 'step' && (
                        <div className="column is-half" key={key}>
                           <BooleanFormInput
                              name={key}
                              label={key}
                              checked={formSubmit.form[key]}
                              update={formSubmit.updateCheck}
                           />
                        </div>
                     )
                  );
               })}
         </div>
      </>
   );
};
export default FeaturesAndProtectedCharacteristicsStep;
