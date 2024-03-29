import React, { useEffect, useState } from 'react';
import { Component, ComponentSelection, Data, SelectionsForm, WizardResponse } from './model';
import BooleanFormInput from '../../elements/inputs/BooleanFormInput';
import TextFormInput from '../../elements/inputs/TextFormInput';

interface Props {
   uuid: string;
   formSubmit: any;
}

const result: WizardResponse = {
   selections: {
      // uuid: '61a3bbc0-8d52-4f05-8246-5c9f600e7ba7',
      // metrics: [
      //    {
      //       id: 'simple',
      //       parameters_value: ''
      //    }
      // ]
   },
   data: {
      metrics: [
         {
            id: 'simple',
            name: 'Simple Metric',
            description: 'A metric that does simple bias analysis',
            parameter_info: 'No parameters',
            parameter_default: {},
            component_type: '',
            file_name: '',
            input_types: [],
            output_types: []
         }
      ]
   }
};

const BiasMetricStep: React.FC<Props> = ({ uuid, formSubmit }) => {
   const [data, setData] = useState<Data>({});
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
         createInitForm(result.data.metrics!, f);
         formSubmit.setForm(f);
         setFormLength(Object.keys(f).length);
      } else {
         const f = formSubmit.form;
         f.uuid = result.selections.uuid;
         createValuesForm(result.selections.metrics!, result.data.metrics!, f);
         formSubmit.setForm(f);
         setFormLength(Object.keys(f).length);
      }
      setData(result.data);
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
         newForm[sm.id.concat('_parameters_value')] = sm.parameters_value;
      });
      form = newForm;
   };

   return (
      <>
         <div className="columns is-multiline">
            {formLength > 1 &&
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
                           <TextFormInput
                              name={metric.id.concat('_parameters_value')}
                              label={metric.name.concat(' Parameters')}
                              value={formSubmit.form[metric.id.concat('_parameters_value')]}
                              update={formSubmit.update}
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
