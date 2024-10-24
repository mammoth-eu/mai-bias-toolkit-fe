import Modal from '../../elements/modal/Modal';
import React from 'react';
import TextFormInput from '../../elements/inputs/TextFormInput';
import { getErrorFields } from '../../elements/inputs/helper';
import { useFormSubmit, Validation } from '../../elements/inputs/useFormSubmit';
import { useAxios } from '../axios/useAxios';
import { useToaster } from '../../elements/toast/useToaster';
import { AxiosError } from 'axios';
import PasswordFormInput from '../../elements/inputs/PasswordFormInput';

interface Props {
   modal: any;
   onClose?: () => void;
   onSubmit?: () => void;
}

interface FormErrors {
   username?: Validation[];
   email?: Validation[];
   password?: Validation[];
   password_confirmation?: Validation[];
}

interface UserForm {
   username: string;
   email: string;
   password: string;
   password_confirmation: string;
   firstName: string;
   lastName: string;
   enabled: boolean;
}

const INITIAL_STATE: UserForm = {
   username: '',
   email: '',
   password: '',
   password_confirmation: '',
   firstName: '',
   lastName: '',
   enabled: true
};

const VALIDATION: FormErrors = {
   username: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required.'
      }
   ],
   email: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required.'
      }
   ],
   password: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required.'
      }
   ],
   password_confirmation: [
      {
         isValid: (value: string) => !!value,
         message: 'Is required.'
      },
      {
         isValid: (value: string, values: string[]) => value === values[0],
         dependencyField: ['password'],
         message: 'Passwords do not match.'
      }
   ]
};

interface UserResponse {
   is_error: boolean;
   result_id: string;
   result_message: string;
}

const CreateUserModal: React.FC<Props> = ({ modal, onClose, onSubmit }) => {
   const { post } = useAxios<UserResponse>();
   const toaster = useToaster();

   const formSubmit = useFormSubmit<UserForm>(INITIAL_STATE, VALIDATION);
   const errorFields: FormErrors = getErrorFields(formSubmit.form, formSubmit.validation);

   const handleSubmit = (event: any) => {
      event.preventDefault();
      formSubmit.setErrors(errorFields);

      const hasErrors = Object.values(errorFields).flat().length > 0;
      if (hasErrors) return;

      const form = {
         username: formSubmit.form.username,
         email: formSubmit.form.email,
         password: formSubmit.form.password,
         firstName: '',
         lastName: '',
         enabled: true
      };

      post('/wizard/users/add', form)
         .then(() => {
            toaster.success(`Successfully saved user ${form.username}`);
            if (onSubmit) onSubmit();
            onCloseModal();
            modal.close();
            event.target.reset();
         })
         .catch((err: AxiosError) => toaster.error(err.message));
   };

   const onCloseModal = () => {
      if (onClose) onClose();
      formSubmit.reset();
   };

   return (
      <form onSubmit={handleSubmit}>
         <Modal
            ref={modal.ref}
            title={'Create new user'}
            onClose={onCloseModal}
            actions={
               <button type="submit" className={'button is-primary'}>
                  Submit
               </button>
            }
         >
            <TextFormInput
               name="username"
               label="Username"
               errors={formSubmit.errors}
               value={formSubmit.form.username}
               placeholder="Insert user's username"
               update={formSubmit.update}
               isRequired
            />
            <TextFormInput
               name="email"
               label="Email"
               errors={formSubmit.errors}
               value={formSubmit.form.email}
               placeholder="Insert user's email"
               update={formSubmit.update}
               isRequired
            />
            <PasswordFormInput
               name="password"
               label="Password"
               errors={formSubmit.errors}
               value={formSubmit.form.password}
               placeholder="Insert user's password"
               update={formSubmit.update}
               isRequired
            />
            <PasswordFormInput
               name="password_confirmation"
               label="Password Confirmation"
               errors={formSubmit.errors}
               value={formSubmit.form.password_confirmation}
               placeholder="Repeat user's password"
               update={formSubmit.update}
               isRequired
            />
         </Modal>
      </form>
   );
};
export default CreateUserModal;
