import Portlet from '../components/elements/portlet/Portlet';
import NoDataFound from '../components/elements/NoDataFound';
import { useEffect, useState } from 'react';
import { useAxios } from '../components/business/axios/useAxios';
import { AxiosError } from 'axios';
import { useToaster } from '../components/elements/toast/useToaster';
import useModal from '../components/elements/modal/useModal.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import CreateUserModal from '../components/business/user/CreateUserModal.tsx';
import Loader from '../components/elements/loader/Loader.tsx';

interface UsersResponse {
   is_error: boolean;
   result_id: string;
   result_message: string;
   users: User[];
}

interface User {
   user_id: string;
   username: string;
   email: string;
}

const UsersPage = () => {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [users, setUsers] = useState<User[]>([]);
   const { get } = useAxios<UsersResponse>();
   const toaster = useToaster();
   const newUserModal = useModal();

   const renderActions = () => {
      return (
         <div className="buttons">
            <button className="button is-primary is-outlined" onClick={newUserModal.open}>
               <span>
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp;New User
               </span>
            </button>
         </div>
      );
   };

   const getUsers = () => {
      get(`/wizard/users/get`)
         .then((result: UsersResponse) => {
            setUsers(result.users);
            setIsLoading(false);
         })
         .catch((e: AxiosError) => {
            toaster.error(e.message);
         });
   };

   useEffect(() => {
      getUsers();
   }, []);

   return (
      <>
         <Portlet title="Users" actions={renderActions()}>
            {isLoading && <Loader />}
            {!isLoading && (
               <div className="table-wrapper">
                  <div className="table-container">
                     <table className="table is-fullwidth is-hoverable mb-0 is-mobile">
                        <thead>
                           <tr>
                              <th style={{ width: '30px' }}>#</th>
                              <th style={{ width: '200px' }}>Username</th>
                              <th style={{ width: '200px' }}>e-mail</th>
                           </tr>
                        </thead>
                        <tbody>
                           <NoDataFound colspan={3} data={users} label="users" />
                           {!!users &&
                              users.map((u: User, index) => {
                                 return (
                                    <tr key={u.user_id}>
                                       <td>{index + 1}</td>
                                       <td>{u.username}</td>
                                       <td>{u.email}</td>
                                    </tr>
                                 );
                              })}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
         </Portlet>
         <CreateUserModal modal={newUserModal} onSubmit={() => getUsers()} />
      </>
   );
};
export default UsersPage;
