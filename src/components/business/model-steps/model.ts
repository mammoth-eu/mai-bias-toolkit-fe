import { Validation } from '../../elements/inputs/useFormSubmit';

export interface SelectionsForm {
   uuid: string;
   name?: string;
   group?: string;
   url_data?: string;
   url_model?: string;
   data_loader_id?: string;
   data_loader_parameters_value?: string;
   model_loader_id?: string;
   model_loader_parameters_value?: string;
   domain?: string;
   [key: string]: boolean | string | undefined; // for attributes and metrics
}

export const MODEL_STEP_INITIAL_STATE = {
   uuid: '',
   name: '',
   group: '',
   url_model: '',
   model_loader_id: '',
   model_loader_parameters_value: ''
};

export interface ModelStepFormErrors {
   name: Validation[];
   group: Validation[];
   url_model: Validation[];
   model_loader_id: Validation[];
   model_loader_parameters_value: Validation[];
}

export const MODEL_STEP_VALIDATION: ModelStepFormErrors = {
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
   ],
   url_model: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ],
   model_loader_id: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ],
   model_loader_parameters_value: [
      {
         isValid: (value: string) => {
            if (value) {
               return false;
            } else {
               try {
                  JSON.parse(value);
                  return false;
               } catch (e) {
                  return true;
               }
            }
         },
         message: 'Is not a valid JSON'
      }
   ]
};

export const DATA_STEP_INITIAL_STATE = {
   uuid: '',
   url_data: '',
   data_loader_id: '',
   data_loader_parameters_value: '',
   domain: ''
};

export interface DataStepFormErrors {
   url_data: Validation[];
   data_loader_id: Validation[];
   domain: Validation[];
}

export const DATA_STEP_VALIDATION: DataStepFormErrors = {
   url_data: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ],
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

export interface ComponentSelection {
   id: string;
   parameters_value: string;
}

export interface WizardResponse {
   selections: Selections;
   data: Data;
}

interface Selections {
   uuid?: string;
   name?: string;
   group?: string;
   url_data?: string;
   url_model?: string;
   attributes?: string[];
   loader_data?: ComponentSelection;
   loader_model?: ComponentSelection;
   domain?: string;
   metrics?: ComponentSelection[];
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
