import React, { useEffect, useState } from 'react';
import { SelectionsForm, WizardResponse } from './model';
import BooleanFormInput from '../../elements/inputs/BooleanFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import Loader from '../../elements/loader/Loader.tsx';
import TextAreaFormInput from '../../elements/inputs/TextAreaFormInput.tsx';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
}

const FeaturesAndProtectedCharacteristicsStep: React.FC<Props> = ({
   uuid,
   formSubmit,
   step,
   isLoading,
   setIsLoading
}) => {
   const [formLength, setFormLength] = useState<number>(3);

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
               createInitForm(result.data.attributes!, result.data.matching_attributes!, f);
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
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   const createInitForm = (attributes: string[], matchingAttributes: string[], form: SelectionsForm) => {
      Object.keys(form).map((key) => {
         key !== 'uuid' && key !== 'step' && key !== 'addedFields' && delete form[key];
      });
      attributes.map((a) => {
         form[a] = matchingAttributes.indexOf(a) > -1;
      });
      form.addedFields = '';
   };

   const createValuesForm = (selectionAttributes: string[], attributes: string[], form: SelectionsForm) => {
      Object.keys(form).map((key) => {
         key !== 'uuid' && key !== 'step' && key !== 'addedFields' && delete form[key];
      });
      form.addedFields = '';
      attributes.map((a) => {
         form[a] = selectionAttributes.indexOf(a) > -1;
      });
      selectionAttributes.map((a) => {
         if (attributes.indexOf(a) === -1) {
            form.addedFields = form.addedFields + a + ', ';
         }
      });
      form.addedFields = form.addedFields.replace(/[, ]+$/, '');
   };

   return (
      <>
         {isLoading && <Loader />}
         {!isLoading && (
            <>
               <div className="columns is-multiline">
                  {formLength > 3 &&
                     Object.keys(formSubmit.form).map((key) => {
                        return (
                           key !== 'uuid' &&
                           key !== 'step' &&
                           key !== 'addedFields' && (
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
               <div>
                  <div>
                     <TextAreaFormInput
                        name="addedFields"
                        label="Custom Feilds"
                        value={formSubmit.form.addedFields}
                        update={formSubmit.update}
                        errors={formSubmit.errors}
                        placeholder="Custom Fields (comma separated)"
                     />
                  </div>
               </div>
            </>
         )}
      </>
   );
};
export default FeaturesAndProtectedCharacteristicsStep;
