import React, { useEffect, useState } from 'react';
import { Component, ComponentSelection, Data, SelectionsForm, WizardResponse } from './model';
import BooleanFormInput from '../../elements/inputs/BooleanFormInput';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import { getAttributesDescription, getDescription, getOptionsDescription, renderSwitchInputForm } from '../helper.tsx';
import Loader from '../../elements/loader/Loader.tsx';
import Box from '../../elements/box/Box.tsx';

interface Props {
   uuid: string;
   formSubmit: any;
   step: number;
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
}

const BiasMetricStep: React.FC<Props> = ({ uuid, formSubmit, step, isLoading, setIsLoading }) => {
   const [data, setData] = useState<Data>({});
   const [formLength, setFormLength] = useState<number>(0);

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
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   const createInitForm = (metrics: Component[], form: SelectionsForm) => {
      metrics.map((m) => {
         form[m.id] = false;
         form[m.id.concat('_parameters_value')] = m.parameter_default;
      });
   };

   const createValuesForm = (selectionMetrics: ComponentSelection[], metrics: Component[], form: SelectionsForm) => {
      const newForm = form;
      metrics.map((m) => {
         newForm[m.id] = false;
         newForm[m.id.concat('_parameters_value')] = m.parameter_default;
      });
      selectionMetrics.map((sm) => {
         newForm[sm.id] = true;
         newForm[sm.id.concat('_parameters_value')] = sm.parameters_value;
      });
      form = newForm;
   };

   return (
      <>
         {isLoading && <Loader />}
         {!isLoading && (
            <>
               {formLength == 2 && (
                  <div>
                     <p style={{ fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center' }}>
                        No metrics available. Please review the selected options.
                     </p>
                     <br />
                  </div>
               )}
               {formLength > 2 && (
                  <div className="columns is-multiline">
                     {data.metrics!.map((metric, i) => {
                        return (
                           <React.Fragment key={i}>
                              <div className="column is-half">
                                 <BooleanFormInput
                                    name={metric.id}
                                    label={metric.name}
                                    checked={formSubmit.form[metric.id]}
                                    update={formSubmit.updateCheck}
                                 />
                                 <Box title="" content={getDescription(metric.description)} />
                                 {/* <Box title="Parameters info:" content={metric.parameter_info} /> */} {/*We are parsing parameter info as tooltips now*/}
                              </div>
                              <div className="column is-half mt-5">
                                 {Object.keys(formSubmit.form[metric.id.concat('_parameters_value')]).map((key) => {
                                    const options = getOptionsDescription(metric.description)[key];
                                    return renderSwitchInputForm(
                                       options?.length
                                          ? 'select'
                                          : typeof formSubmit.form[metric.id.concat('_parameters_value')][key],
                                       key,
                                       metric.id.concat('_parameters_value'),
                                       formSubmit,
                                       typeof formSubmit.form[metric.id.concat('_parameters_value')][key] ===
                                          'number' &&
                                          !Number.isInteger(
                                             formSubmit.form[metric.id.concat('_parameters_value')][key]
                                          ),
                                       getAttributesDescription(metric.description)[key] +
                                          ' (default: ' +
                                          metric.parameter_default[key] +
                                          ') ',
                                       options ? [...options, metric.parameter_default[key]] : undefined
                                    );
                                 })}
                              </div>
                           </React.Fragment>
                        );
                     })}
                  </div>
               )}
            </>
         )}
      </>
   );
};
export default BiasMetricStep;
