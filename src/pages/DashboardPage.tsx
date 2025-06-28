import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import logo from '../../public/trim-415585277-194ca892-0fd6-493b-8cf5-8ee70546f270.png';


const DashboardPage = () => {
   return (
      <>

      <div className="columns is-centered">
         <div className="column is-narrow has-text-centered">
         </div>
      </div>
      <div className="columns mx-2 my-2">
         <div className="column is-half has-text-centered">
            <Link to="/model">
               <button className="button is-large is-primary is-outlined is-fullwidth">
                  <span className="icon is-medium">
                     <FontAwesomeIcon icon={faDiagramProject} />
                  </span>
                  <span><b>Explore</b></span>&nbsp;<span className="has-text-grey">bias</span>
               </button>
            </Link>
         </div>
         <div className="column is-half has-text-centered">
            <Link to="/runs">
               <button className="button is-large is-primary is-outlined is-fullwidth">
                  <span className="icon is-medium">
                     <FontAwesomeIcon icon={faList} />
                  </span>
                  <span><b>Tasks</b></span>&nbsp;<span className="has-text-grey">& results</span>
               </button>
            </Link>
         </div>
      </div>
      <div className="columns is-centered mt-6">
         <div className="column is-narrow has-text-centered">
            <img src={logo} alt="Official Mammoth Logo" width="300" />
         </div>
      </div>


      </>
   );
};
export default DashboardPage;
