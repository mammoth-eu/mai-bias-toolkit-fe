import Portlet from '../components/elements/portlet/Portlet';
import { useAxios } from '../components/business/axios/useAxios';
import { useToaster } from '../components/elements/toast/useToaster';
import TextFormInput from '../components/elements/inputs/TextFormInput.tsx';
import { useFormSubmit, Validation } from '../components/elements/inputs/useFormSubmit.ts';
import { getErrorFields } from '../components/elements/inputs/helper.ts';
import { AxiosError } from 'axios';

interface ComponentForm {
   yaml_file_url: string;
   meta_yaml_file_url: string;
}

interface ComponentResponse {
   is_error: boolean;
   result_id: string;
   result_message: string;
}

interface ComponentFormErrors {
   yaml_file_url: Validation[];
   meta_yaml_file_url: Validation[];
}

const COMPONENT_INITIAL_STATE: ComponentForm = { yaml_file_url: '', meta_yaml_file_url: '' };

const COMPONENT_VALIDATION: ComponentFormErrors = {
   yaml_file_url: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ],
   meta_yaml_file_url: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required'
      }
   ]
};

const ComponentPage = () => {
   const formSubmit = useFormSubmit<ComponentForm>(COMPONENT_INITIAL_STATE, COMPONENT_VALIDATION);

   const errorFields = getErrorFields(formSubmit.form, formSubmit.validation);

   const { post } = useAxios<ComponentResponse>();

   const toaster = useToaster(10000);

   const handleSubmit = (event: any) => {
      event.preventDefault();
      formSubmit.setErrors(errorFields);
      const hasErrors = Object.values(errorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      post(`/wizard/import/component`, formSubmit.form)
         .then(() => {
            toaster.success('Component successfully imported!');
            formSubmit.setForm(COMPONENT_INITIAL_STATE);
            formSubmit.setValidation(COMPONENT_VALIDATION);
            formSubmit.setErrors({});
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   return (
      <>
         <Portlet title="Import Component">
            <div className="columns is-multiline">
               <div className="column is-half">
                  <TextFormInput
                     name="yaml_file_url"
                     label="YAML file URL"
                     value={formSubmit.form.yaml_file_url}
                     update={formSubmit.update}
                     errors={formSubmit.errors}
                     placeholder="YAML file URL"
                     isRequired
                  />
               </div>
               <div className="column is-half">
                  <TextFormInput
                     name="meta_yaml_file_url"
                     label="meta YAML file URL"
                     value={formSubmit.form.meta_yaml_file_url}
                     update={formSubmit.update}
                     errors={formSubmit.errors}
                     placeholder="meta YAML file URL"
                     isRequired
                  />
               </div>
               <div className="column is-half" />
               <div className="column is-half is-flex is-justify-content-center is-align-items-center">
                  <button className={'button is-primary'} type="button" onClick={handleSubmit}>
                     Import
                  </button>
               </div>
            </div>
         </Portlet>
      </>
   );
};
export default ComponentPage;
