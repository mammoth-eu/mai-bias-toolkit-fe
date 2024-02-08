import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { useAxios } from '../components/business/axios/useAxios';

const DashboardPage = () => {

   // this is a dummy test endpoint
   const { get } = useAxios();
   get('/keycloak-protected')
      .then((r) => console.log(r))
      .catch((e) => console.log(e));

   return (
      <>
         <div className="columns mx-6 my-6">
            <div className="column is-one-third has-text-centered">
               <Link to="/dataset">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faFile} />
                     </span>
                     <span>Dataset Bias Detection</span>
                  </button>
               </Link>
            </div>
            <div className="column is-one-third has-text-centered">
               <Link to="/model">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faDiagramProject} />
                     </span>
                     <span>Model Exploration</span>
                  </button>
               </Link>
            </div>
            <div className="column is-one-third has-text-centered">
               <Link to="/runs">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faList} />
                     </span>
                     <span>Runs</span>
                  </button>
               </Link>
            </div>
         </div>
      </>
   );
};
export default DashboardPage;
