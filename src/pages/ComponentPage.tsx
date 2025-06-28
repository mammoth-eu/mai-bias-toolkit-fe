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

const DEFAULT_YAML_URL = 'https://github.com/mammoth-eu/mammoth-commons/releases/download/latest/module_yamls.tar.gz';
const COMPONENT_INITIAL_STATE: ComponentForm = { yaml_file_url: DEFAULT_YAML_URL, meta_yaml_file_url: DEFAULT_YAML_URL};

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
   const handleSubmitMass = (event: any) => {
      event.preventDefault();
      formSubmit.setErrors(errorFields);
      const hasErrors = Object.values(errorFields).flat().length > 0;
      if (hasErrors) return Promise.reject();
      post(`/wizard/import/manycomponents`, formSubmit.form)
         .then(() => {
            toaster.success('Components successfully imported!');
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
         <Portlet title="Modules">

            <div className="rows is-multiline">
               <div className="column is-half">
                  <TextFormInput
                     name="yaml_file_url"
                     label="KubeFlow URL"
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
                     label="Metadata URL"
                     value={formSubmit.form.meta_yaml_file_url}
                     update={formSubmit.update}
                     errors={formSubmit.errors}
                     placeholder="meta YAML file URL"
                     isRequired
                  />
               </div>
               <div className="column is-half is-flex is-justify-content-left is-align-items-center">
                  <button className={'button is-primary mx-1 is-outlined'} type="button" onClick={handleSubmitMass}>
                     Mass import
                  </button>
                  <button className={'button is-primary mx-1 is-outlined'} type="button" onClick={handleSubmit}>
                     Single import
                  </button>
               </div>
               <div className="mx-2 column is-half">
                  <p>
                  MAI-BIAS toolkit modules comprise a KubeFlow Pipelines (KFP) data file describing their dockerized component and programmatic interface, 
                  a metadata file letting the toolkit know about documentation details like argument types and descriptions, and an online docker image
                  that is automatically retrieved from the KFP file. You may use the <a href="https://github.com/mammoth-eu/mammoth-commons">mammoth-commons</a> library 
                  to automatically generate everything by adding decorators and typehints to simple Python interfaces. Single import requires the data and
                  metadata <i>yaml</i> files.</p>
                  <br/>
                  <p>Use mass import to import all files residing in <i>*.tar.gz</i> compressed URLs. Those files should be placed under
                  the sub-directory <i>*.tar.gz/data</i> for KFP data and <i>*.tar.gz/meta</i> for the toolkit's metadata.
                  The defaults provided in this form update all the modules developed by the MAMMOth project, which are made available from the mammoth-commons repository. 
                  A full catalogue of those modules is available <a href="https://mammoth-eu.github.io/mammoth-commons">here</a>.
                  </p>
               </div>
            </div>
         </Portlet>
      </>
   );
};
export default ComponentPage;
