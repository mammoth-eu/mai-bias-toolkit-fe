import Portlet from '../components/elements/portlet/Portlet';
import MultistepForm from '../components/elements/multistep-form/MultistepForm';
import MultistepMarker from '../components/elements/multistep-form/MultistepMarker';
import ModelStep from '../components/business/model-steps/ModelStep';
import DataStep from '../components/business/model-steps/DataStep';
import FeaturesAndProtectedCharacteristicsStep from '../components/business/model-steps/FeaturesAndProtectedCharacteristicsStep';
import OverviewStep from '../components/business/model-steps/OverviewStep';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormSubmit } from '../components/elements/inputs/useFormSubmit';
import {
   ComponentSelection,
   DATA_STEP_INITIAL_STATE,
   DATA_STEP_VALIDATION,
   MODEL_STEP_INITIAL_STATE,
   MODEL_STEP_VALIDATION,
   SelectionsForm
} from '../components/business/model-steps/model';
import { getErrorFields } from '../components/elements/inputs/helper';
import { useToaster } from '../components/elements/toast/useToaster';
import { isAtLeastOneSelected } from '../components/business/helper';
import BiasMetricStep from '../components/business/model-steps/BiasMetricStep';
import { useAxios } from '../components/business/axios/useAxios';
import { AxiosError } from 'axios';

const ModelPage = () => {
   const [uuid, setUuid] = useState<string>('');
   useEffect(() => {
      const uuid = crypto.randomUUID();
      setUuid(uuid);
   }, []);

   const navigate = useNavigate();

   const toaster = useToaster();

   const { post } = useAxios();

   const stepMarkers = () => {
      const markers = [];
      let index = 1;
      markers.push(<MultistepMarker step={index++} title="Model" />);
      markers.push(<MultistepMarker step={index++} title="Data" />);
      markers.push(<MultistepMarker step={index++} title="Features & Protected Characteristics" />);
      markers.push(<MultistepMarker step={index++} title="Bias Metric" />);
      markers.push(<MultistepMarker step={index++} title="Overview" />);
      return markers;
   };

   const multiSteps = () => {
      const steps = [];
      let index = 1;
      steps.push(<ModelStep key={index++} uuid={uuid} formSubmit={modelStepFormSubmit} />);
      steps.push(<DataStep key={index++} uuid={uuid} formSubmit={dataStepFormSubmit} />);
      steps.push(
         <FeaturesAndProtectedCharacteristicsStep key={index++} uuid={uuid} formSubmit={featureStepFormSubmit} />
      );
      steps.push(<BiasMetricStep key={index++} uuid={uuid} formSubmit={biasStepFormSubmit} />);
      steps.push(<OverviewStep key={index++} uuid={uuid} />);
      return steps;
   };

   const modelStepFormSubmit = useFormSubmit<SelectionsForm>(MODEL_STEP_INITIAL_STATE, MODEL_STEP_VALIDATION);

   const modelStepErrorFields = getErrorFields(modelStepFormSubmit.form, modelStepFormSubmit.validation);

   const handleSubmitModelStep = (event: any) => {
      event.preventDefault();
      modelStepFormSubmit.setErrors(modelStepErrorFields);
      const hasErrors = Object.values(modelStepErrorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      const submitForm = {
         uuid: modelStepFormSubmit.form.uuid,
         name: modelStepFormSubmit.form.name,
         group: modelStepFormSubmit.form.group,
         url_model: modelStepFormSubmit.form.url_model,
         loader_model: {
            id: modelStepFormSubmit.form.model_loader_id,
            parameters_value: modelStepFormSubmit.form.model_loader_parameters_value
               ? JSON.parse(modelStepFormSubmit.form.model_loader_parameters_value)
               : {}
         }
      };
      return post(`/wizard/store/${submitForm.uuid}`, submitForm)
         .then(() => {
            return true;
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
            return false;
         });
   };

   const dataStepFormSubmit = useFormSubmit<SelectionsForm>(DATA_STEP_INITIAL_STATE, DATA_STEP_VALIDATION);

   const dataStepErrorFields = getErrorFields(dataStepFormSubmit.form, dataStepFormSubmit.validation);

   const handleSubmitDataStep = (event: any) => {
      event.preventDefault();
      console.log('form', dataStepFormSubmit.form);
      dataStepFormSubmit.setErrors(dataStepErrorFields);
      const hasErrors = Object.values(dataStepErrorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      const submitForm = {
         uuid: dataStepFormSubmit.form.uuid,
         url_data: dataStepFormSubmit.form.url_data,
         data_loader: {
            id: dataStepFormSubmit.form.data_loader_id,
            parameters_value: dataStepFormSubmit.form.data_loader_parameters_value
         },
         domain: dataStepFormSubmit.form.domain
      };
      console.log('submitForm', submitForm);
      // ToDo post form, backend integration
      return Promise.resolve(() => {
         return true;
      });
   };

   const featureStepFormSubmit = useFormSubmit<SelectionsForm>({ uuid: '' }, {});

   const handleSubmitFeatureStep = (event: any) => {
      event.preventDefault();
      console.log('form', featureStepFormSubmit.form);
      const atLeastOneSelected = isAtLeastOneSelected(featureStepFormSubmit.form as SelectionsForm);
      if (!atLeastOneSelected) {
         toaster.error('Please select at least one feature!');
         return Promise.reject();
      }
      const submitForm = {
         uuid: featureStepFormSubmit.form.uuid,
         attributes: [] as string[]
      };
      Object.keys(featureStepFormSubmit.form).map((key) => {
         if (key !== 'uuid' && featureStepFormSubmit.form[key]) {
            submitForm.attributes.push(key);
         }
      });
      console.log('submitForm', submitForm);
      return Promise.resolve(() => {
         return true;
      });
   };

   const biasStepFormSubmit = useFormSubmit<SelectionsForm>({ uuid: '' }, {});

   const handleSubmitBiasStep = (event: any) => {
      event.preventDefault();
      console.log('form', biasStepFormSubmit.form);
      const atLeastOneSelected = isAtLeastOneSelected(biasStepFormSubmit.form as SelectionsForm);
      if (!atLeastOneSelected) {
         toaster.error('Please select at least one bias metric!');
         return Promise.reject();
      }
      const submitForm = {
         uuid: biasStepFormSubmit.form.uuid,
         metrics: [] as ComponentSelection[]
      };
      Object.keys(biasStepFormSubmit.form).map((key) => {
         if (key !== 'uuid' && !key.endsWith('_parameters_value') && biasStepFormSubmit.form[key]) {
            const metric = {
               id: key,
               parameters_value: biasStepFormSubmit.form[key.concat('_parameters_value')]
            };
            submitForm.metrics.push(metric as ComponentSelection);
         }
      });
      console.log('submitForm', submitForm);
      return Promise.resolve(() => {
         return true;
      });
   };

   const handleSubmitOverviewStep = (event: any) => {
      event.preventDefault();
      // todo call backend in order to initiate computation
      navigate('/runs');
      return Promise.resolve(() => {
         return true;
      });
   };

   const stepActions = () => {
      const actions = [];
      actions.push(handleSubmitModelStep);
      actions.push(handleSubmitDataStep);
      actions.push(handleSubmitFeatureStep);
      actions.push(handleSubmitBiasStep);
      actions.push(handleSubmitOverviewStep);
      return actions;
   };

   return (
      <>
         <div>
            <Portlet>
               <MultistepForm markerSteps={stepMarkers()} steps={multiSteps()} stepActions={stepActions()} />
            </Portlet>
         </div>
      </>
   );
};
export default ModelPage;
