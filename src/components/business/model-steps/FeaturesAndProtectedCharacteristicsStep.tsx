import React, { useEffect, useState } from 'react';
import { SelectionsForm, WizardResponse } from './model';
import BooleanFormInput from '../../elements/inputs/BooleanFormInput';

interface Props {
   uuid: string;
   formSubmit: any;
}

const result: WizardResponse = {
   selections: {
      // uuid: '61a3bbc0-8d52-4f05-8246-5c9f600e7ba7',
      // attributes: ['age', 'gender']
   },
   data: {
      attributes: ['age', 'gender', 'race', 'religion']
   }
};

const FeaturesAndProtectedCharacteristicsStep: React.FC<Props> = ({ uuid, formSubmit }) => {
   const [formLength, setFormLength] = useState<number>(1);

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
         createInitForm(result.data.attributes!, f);
         formSubmit.setForm(f);
         setFormLength(Object.keys(f).length);
      } else {
         const f = formSubmit.form;
         f.uuid = result.selections.uuid;
         createValuesForm(result.selections.attributes!, result.data.attributes!, f);
         formSubmit.setForm(f);
         setFormLength(Object.keys(f).length);
      }
   };

   const createInitForm = (attributes: string[], form: SelectionsForm) => {
      attributes.map((a) => {
         form[a] = false;
      });
   };

   const createValuesForm = (selectionAttributes: string[], attributes: string[], form: SelectionsForm) => {
      attributes.map((a) => {
         form[a] = selectionAttributes.indexOf(a) > -1 ? true : false;
      });
   };

   return (
      <>
         <div className="columns is-multiline">
            {formLength > 1 &&
               Object.keys(formSubmit.form).map((key) => {
                  return (
                     key !== 'uuid' && (
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
