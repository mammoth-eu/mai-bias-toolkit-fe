import React, { useEffect, useState } from 'react';
import { BiasStepFormErrors, Component, ComponentSelection, Data, SelectionsForm, WizardResponse } from './model';
import BooleanFormInput from '../../elements/inputs/BooleanFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import TextAreaFormInput from "../../elements/inputs/TextAreaFormInput";

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
}

const BiasMetricStep: React.FC<Props> = ({ uuid, formSubmit, step }) => {
   const [data, setData] = useState<Data>({});
   const [formLength, setFormLength] = useState<number>(2);

   const { get } = useAxios<WizardResponse>();

   const toaster = useToaster();

   useEffect(() => {
      if (uuid) {
         load();
      }
   }, [uuid]);

   const load = () => {
      get(`/wizard/databias/metric/${uuid}`)
         .then((result) => {
            const v = {};
            createValidation(result.data.metrics!, v);
            formSubmit.setValidation(v);
            if (result.selections.step < step) {
               const f = formSubmit.form;
               f.uuid = uuid;
               createInitForm(result.data.metrics!, f);
               formSubmit.setForm(f);
               setFormLength(Object.keys(f).length);
            } else {
               const f = formSubmit.form;
               f.uuid = result.selections.uuid;
               createValuesForm(result.selections.metrics!, result.data.metrics!, f);
               f.step = result.selections.step;
               formSubmit.setForm(f);
               setFormLength(Object.keys(f).length);
            }
            setData(result.data);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   const createInitForm = (metrics: Component[], form: SelectionsForm) => {
      metrics.map((m) => {
         form[m.id] = false;
         form[m.id.concat('_parameters_value')] = '';
      });
   };

   const createValuesForm = (selectionMetrics: ComponentSelection[], metrics: Component[], form: SelectionsForm) => {
      const newForm = form;
      metrics.map((m) => {
         newForm[m.id] = false;
         newForm[m.id.concat('_parameters_value')] = '';
      });
      selectionMetrics.map((sm) => {
         newForm[sm.id] = true;
         newForm[sm.id.concat('_parameters_value')] =
            JSON.stringify(sm.parameters_value) === '{}' ? '' : JSON.stringify(sm.parameters_value);
      });
      form = newForm;
   };

   const createValidation = (metrics: Component[], validation: BiasStepFormErrors) => {
      metrics.map((m: Component) => {
         validation[m.id.concat('_parameters_value')] = [
            {
               isValid: (value: string) => {
                  if (!value) {
                     return true;
                  } else {
                     try {
                        JSON.parse(value);
                        return true;
                     } catch (e) {
                        return false;
                     }
                  }
               },
               message: 'Is not a valid JSON'
            }
         ];
      });
   };

   return (
      <>
         <div className="columns is-multiline">
            {formLength > 2 &&
               data.metrics!.map((metric, i) => {
                  return (
                     <React.Fragment key={i}>
                        <div className="column is-half">
                           <BooleanFormInput
                              name={metric.id}
                              label={metric.name}
                              checked={formSubmit.form[metric.id]}
                              update={formSubmit.updateCheck}
                           />
                           {/*<label className="label">Description:</label>*/}
                           <p style={{ whiteSpace: 'pre-line' }}>{metric.description}</p>
                        </div>
                        <div className="column is-half">
                           <TextAreaFormInput
                              name={metric.id.concat('_parameters_value')}
                              label={metric.name.concat(' Parameters')}
                              value={formSubmit.form[metric.id.concat('_parameters_value')]}
                              update={formSubmit.update}
                              errors={formSubmit.errors}
                              placeholder={metric.name.concat(' Parameters')}
                           />
                           <label className="label">Parameters info:</label>
                           <p style={{ whiteSpace: 'pre-line' }}>{metric.parameter_info}</p>
                           <label className="label">Parameters default values:</label>
                           <p style={{ whiteSpace: 'pre-line' }}>{JSON.stringify(metric.parameter_default)}</p>
                        </div>
                     </React.Fragment>
                  );
               })}
         </div>
      </>
   );
};
export default BiasMetricStep;
