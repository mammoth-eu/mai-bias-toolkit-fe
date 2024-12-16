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
   RUN_STEP_INITIAL_STATE,
   RUN_STEP_VALIDATION,
   SelectionsForm
} from '../components/business/model-steps/model';
import { getErrorFields } from '../components/elements/inputs/helper';
import { useToaster } from '../components/elements/toast/useToaster';
import { isAtLeastOneSelected } from '../components/business/helper.tsx';
import BiasMetricStep from '../components/business/model-steps/BiasMetricStep';
import { useAxios } from '../components/business/axios/useAxios';
import { AxiosError } from 'axios';
import RunStep from '../components/business/model-steps/RunStep.tsx';

const ModelPage = () => {
   const [uuid, setUuid] = useState<string>('');
   useEffect(() => {
      const uuid = crypto.randomUUID();
      setUuid(uuid);
   }, []);

   const navigate = useNavigate();

   const toaster = useToaster();

   const { get, post } = useAxios();

   const [isLoadingRunStep, setIsLoadingRunStep] = useState<boolean>(true);
   const [isLoadingModelStep, setIsLoadingModelStep] = useState<boolean>(true);
   const [isLoadingDataStep, setIsLoadingDataStep] = useState<boolean>(true);
   const [isLoadingFeatureStep, setIsLoadingFeatureStep] = useState<boolean>(true);
   const [isLoadingBiasMetricStep, setIsLoadingBiasMetricStep] = useState<boolean>(true);
   const [isLoadingOverviewStep, setIsLoadingOverviewStep] = useState<boolean>(true);

   const stepMarkers = () => {
      const markers = [];
      let index = 1;
      markers.push(<MultistepMarker step={index++} title="Run" />);
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
      steps.push(
         <RunStep
            key={index++}
            uuid={uuid}
            formSubmit={runStepFormSubmit}
            step={1}
            isLoading={isLoadingRunStep}
            setIsLoading={setIsLoadingRunStep}
         />
      );
      steps.push(
         <ModelStep
            key={index++}
            uuid={uuid}
            formSubmit={modelStepFormSubmit}
            step={2}
            isLoading={isLoadingModelStep}
            setIsLoading={setIsLoadingModelStep}
         />
      );
      steps.push(
         <DataStep
            key={index++}
            uuid={uuid}
            formSubmit={dataStepFormSubmit}
            step={3}
            isLoading={isLoadingDataStep}
            setIsLoading={setIsLoadingDataStep}
         />
      );
      steps.push(
         <FeaturesAndProtectedCharacteristicsStep
            key={index++}
            uuid={uuid}
            formSubmit={featureStepFormSubmit}
            step={4}
            isLoading={isLoadingFeatureStep}
            setIsLoading={setIsLoadingFeatureStep}
         />
      );
      steps.push(
         <BiasMetricStep
            key={index++}
            uuid={uuid}
            formSubmit={biasStepFormSubmit}
            step={5}
            isLoading={isLoadingBiasMetricStep}
            setIsLoading={setIsLoadingBiasMetricStep}
         />
      );
      steps.push(
         <OverviewStep
            key={index++}
            uuid={uuid}
            isLoading={isLoadingOverviewStep}
            setIsLoading={setIsLoadingOverviewStep}
         />
      );
      return steps;
   };

   const runStepFormSubmit = useFormSubmit<SelectionsForm>(RUN_STEP_INITIAL_STATE, RUN_STEP_VALIDATION);

   const runStepErrorFields = getErrorFields(runStepFormSubmit.form, runStepFormSubmit.validation);

   const handleSubmitRunStep = (event: any) => {
      event.preventDefault();
      runStepFormSubmit.setErrors(runStepErrorFields);
      const hasErrors = Object.values(runStepErrorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      const submitForm = {
         uuid: runStepFormSubmit.form.uuid,
         name: runStepFormSubmit.form.name,
         group: runStepFormSubmit.form.group,
         step: runStepFormSubmit.form.step
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

   const modelStepFormSubmit = useFormSubmit<SelectionsForm>(MODEL_STEP_INITIAL_STATE, MODEL_STEP_VALIDATION);

   const modelStepErrorFields = getErrorFields(modelStepFormSubmit.form, modelStepFormSubmit.validation);

   const handleSubmitModelStep = (event: any) => {
      event.preventDefault();
      modelStepFormSubmit.setErrors(modelStepErrorFields);
      const hasErrors = Object.values(modelStepErrorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      const submitForm = {
         uuid: modelStepFormSubmit.form.uuid,
         loader_model: {
            id: modelStepFormSubmit.form.model_loader_id,
            parameters_value: modelStepFormSubmit.form.model_loader_parameters_value
         },
         step: modelStepFormSubmit.form.step
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
      dataStepFormSubmit.setErrors(dataStepErrorFields);
      const hasErrors = Object.values(dataStepErrorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      const submitForm = {
         uuid: dataStepFormSubmit.form.uuid,
         loader_data: {
            id: dataStepFormSubmit.form.data_loader_id,
            parameters_value: dataStepFormSubmit.form.data_loader_parameters_value
         },
         domain: dataStepFormSubmit.form.domain,
         step: dataStepFormSubmit.form.step
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

   const featureStepFormSubmit = useFormSubmit<SelectionsForm>({ uuid: '', addedFields: '', step: 4 }, {});

   const handleSubmitFeatureStep = (event: any) => {
      event.preventDefault();
      const atLeastOneSelected = isAtLeastOneSelected(featureStepFormSubmit.form as SelectionsForm);
      if (!atLeastOneSelected && !featureStepFormSubmit.form.addedFields) {
         toaster.error('Please select at least one feature or add a custom feature!');
         return Promise.reject();
      }
      const submitForm = {
         uuid: featureStepFormSubmit.form.uuid,
         attributes: [] as string[],
         step: featureStepFormSubmit.form.step
      };
      Object.keys(featureStepFormSubmit.form).forEach((key) => {
         if (key !== 'uuid' && key !== 'step' && key !== 'addedFields' && featureStepFormSubmit.form[key]) {
            submitForm.attributes.push(key);
         }
      });
      featureStepFormSubmit.form.addedFields.split(',').forEach((f: string) => {
         f && submitForm.attributes.push(f.trim());
      });
      return post(`/wizard/store/${submitForm.uuid}`, submitForm)
         .then(() => {
            return true;
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
            return false;
         });
   };

   const biasStepFormSubmit = useFormSubmit<SelectionsForm>({ uuid: '', step: 5 }, {});

   const handleSubmitBiasStep = (event: any) => {
      event.preventDefault();
      const atLeastOneSelected = isAtLeastOneSelected(biasStepFormSubmit.form as SelectionsForm);
      if (!atLeastOneSelected) {
         toaster.error('Please select at least one bias metric!');
         return Promise.reject();
      }
      const biasStepErrorFields = getErrorFields(biasStepFormSubmit.form, biasStepFormSubmit.validation);
      biasStepFormSubmit.setErrors(biasStepErrorFields);
      const hasErrors = Object.values(biasStepErrorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      const submitForm = {
         uuid: biasStepFormSubmit.form.uuid,
         metrics: [] as ComponentSelection[],
         step: biasStepFormSubmit.form.step
      };
      Object.keys(biasStepFormSubmit.form).forEach((key) => {
         if (key !== 'uuid' && key !== 'step' && !key.endsWith('_parameters_value') && biasStepFormSubmit.form[key]) {
            const metric = {
               id: key,
               parameters_value: biasStepFormSubmit.form[key.concat('_parameters_value')]
            };
            submitForm.metrics.push(metric as ComponentSelection);
         }
      });
      return post(`/wizard/store/${submitForm.uuid}`, submitForm)
         .then(() => {
            return true;
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
            return false;
         });
   };

   const handleSubmitOverviewStep = (event: any) => {
      event.preventDefault();
      return get(`/wizard/databias/submit/${uuid}`)
         .then(() => {
            navigate('/runs');
            return true;
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
            return false;
         });
   };

   const stepActions = () => {
      const actions = [];
      actions.push(handleSubmitRunStep);
      actions.push(handleSubmitModelStep);
      actions.push(handleSubmitDataStep);
      actions.push(handleSubmitFeatureStep);
      actions.push(handleSubmitBiasStep);
      actions.push(handleSubmitOverviewStep);
      return actions;
   };

   const stepLoadings = () => {
      const loadings: [boolean, (isLoading: boolean) => void][] = [];
      loadings.push([isLoadingRunStep, setIsLoadingRunStep]);
      loadings.push([isLoadingModelStep, setIsLoadingModelStep]);
      loadings.push([isLoadingDataStep, setIsLoadingDataStep]);
      loadings.push([isLoadingFeatureStep, setIsLoadingFeatureStep]);
      loadings.push([isLoadingBiasMetricStep, setIsLoadingBiasMetricStep]);
      loadings.push([isLoadingOverviewStep, setIsLoadingOverviewStep]);
      return loadings;
   };

   return (
      <>
         <div>
            <Portlet>
               <MultistepForm
                  markerSteps={stepMarkers()}
                  steps={multiSteps()}
                  stepActions={stepActions()}
                  stepLoadings={stepLoadings()}
               />
            </Portlet>
         </div>
      </>
   );
};
export default ModelPage;
