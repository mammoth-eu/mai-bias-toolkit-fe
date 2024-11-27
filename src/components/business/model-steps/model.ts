import { Validation } from '../../elements/inputs/useFormSubmit';

export interface SelectionsForm {
   uuid: string;
   name?: string;
   group?: string;
   data_loader_id?: string;
   data_loader_parameters_value?: object;
   model_loader_id?: string;
   model_loader_parameters_value?: object;
   domain?: string;
   step: number;
   [key: string]: boolean | string | number | object | undefined; // for attributes and metrics (object not applied)
}

export const RUN_STEP_INITIAL_STATE = {
   uuid: '',
   name: '',
   group: '',
   step: 1
};

export interface RunStepFormErrors {
   name: Validation[];
   group: Validation[];
}

export const RUN_STEP_VALIDATION: RunStepFormErrors = {
   name: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ],
   group: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ]
};

export const MODEL_STEP_INITIAL_STATE = {
   uuid: '',
   model_loader_id: '',
   model_loader_parameters_value: {},
   step: 2
};

export interface ModelStepFormErrors {
   model_loader_id: Validation[];
}

export const MODEL_STEP_VALIDATION: ModelStepFormErrors = {
   model_loader_id: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ]
};

export const DATA_STEP_INITIAL_STATE = {
   uuid: '',
   data_loader_id: '',
   data_loader_parameters_value: {},
   domain: '',
   step: 3
};

export interface DataStepFormErrors {
   data_loader_id: Validation[];
   domain: Validation[];
}

export const DATA_STEP_VALIDATION: DataStepFormErrors = {
   data_loader_id: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ],
   domain: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ]
};

export interface BiasStepFormErrors {
   [key: string]: Validation[];
}

export interface ComponentSelection {
   id: string;
   parameters_value: object;
}

export interface WizardResponse {
   selections: Selections;
   data: Data;
}

export interface Selections {
   uuid?: string;
   name?: string;
   group?: string;
   attributes?: string[];
   loader_data?: ComponentSelection;
   loader_model?: ComponentSelection;
   domain?: string;
   metrics?: ComponentSelection[];
   run_type: string;
   step: number;
   run_id?: string;
   run_artifacts?: string[];
}

export interface Data {
   attributes?: string[];
   loaders?: Component[];
   domains?: Domain[];
   metrics?: Component[];
}

export interface Component {
   id: string;
   name: string;
   description: string;
   parameter_info: string;
   parameter_default: { [key: string]: any };
   component_type: string;
   file_name: string;
   input_types: string[];
   output_types: string[];
}

export interface Domain {
   id: string;
   name: string;
}
