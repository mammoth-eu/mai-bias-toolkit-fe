import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

const DashboardPage = () => {
   return (
      <>
         <div className="columns mx-6 my-6">
            {/*<div className="column is-one-third has-text-centered">*/}
            {/*   <Link to="/dataset">*/}
            {/*      <button className="button is-large is-primary is-outlined">*/}
            {/*         <span className="icon is-medium">*/}
            {/*            <FontAwesomeIcon icon={faFile} />*/}
            {/*         </span>*/}
            {/*         <span>Dataset Bias Detection</span>*/}
            {/*      </button>*/}
            {/*   </Link>*/}
            {/*</div>*/}
            <div className="column is-half has-text-centered">
               <Link to="/">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faHouse} />
                     </span>
                     <span>Dashboard</span>
                  </button>
               </Link>
            </div>
            <div className="column is-half has-text-centered">
               <Link to="/model">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faDiagramProject} />
                     </span>
                     <span>Model Exploration</span>
                  </button>
               </Link>
            </div>
         </div>
         <div className="columns mx-6 my-6">
            <div className="column is-half has-text-centered">
               <Link to="/runs">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faList} />
                     </span>
                     <span>Runs</span>
                  </button>
               </Link>
            </div>
            <div className="column is-half has-text-centered">
               <Link to="/component">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faPuzzlePiece} />
                     </span>
                     <span>Import Component</span>
                  </button>
               </Link>
            </div>
         </div>
         <div className="columns mx-6 my-6">
            <div className="column is-half has-text-centered">
               <Link to="/users">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faUsers} />
                     </span>
                     <span>Users</span>
                  </button>
               </Link>
            </div>
            <div className="column is-half has-text-centered">
               <Link to="/about">
                  <button className="button is-large is-primary is-outlined">
                     <span className="icon is-medium">
                        <FontAwesomeIcon icon={faCircleInfo} />
                     </span>
                     <span>About</span>
                  </button>
               </Link>
            </div>
         </div>
      </>
   );
};
export default DashboardPage;
