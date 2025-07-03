import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import logo from '../../public/trim-415585277-194ca892-0fd6-493b-8cf5-8ee70546f270_transparent.png';


const DashboardPage = () => {
   return (
      <>

      <div className="columns is-centered">
         <div className="column is-narrow has-text-centered">
         </div>
      </div>
      <div className="columns mx-2 mt-2 mb-6">
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
               <a
                  href="https://github.com/mammoth-eu/mammoth-toolkit-releases"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <img src={logo} alt="Official ΜΑΜΜΟτη Logo" width="300"/>
               </a>
               <div className="is-small has-text-grey">Open source repository & toolkit</div>
            </div>
      </div>

      <div className="columns is-multiline is-centered my-4">
         <div className="column is-half box">
            Fairness is multi-layered in that it needs to account for various aspects, 
            such as technical, social, legal, and ethical. This toolkit is meant for AI system creators, so it
            focuses on the technical aspects. However, these make up only a part of
            the problem; we recommend close cooperation
            with other disciplines to properly address the issue of fairness.
            <br/><br/>
            <ul>
               <li>💡 <a className="has-tooltip-right has-text-info" data-tooltip="To learn more about an interdisciplinary approach to fairnes, 
click here to refer to the MAMMOth project's AI fairness definition guide." href='https://github.com/mammoth-eu/FairnessDefinitionGuide'>Consult</a> with legal experts to ensure compliance with laws and regulations.</li>
               <li>💡 Work with social scientists to gather interests of <span className="has-tooltip-top has-text-info" data-tooltip="Stakeholders refer to individuals or social groups who might be positively or negatively affected by the use of AI. 
They include, for example, developers, users, profiting organizations, policymakers, and vulnerable groups who might be discriminated against by its use. 
They may also include product owners, such as parent or funding organizations, that drive the system’s main technical specifications. ">
                  stakeholders
               </span> and ensure that they are adequately represented and integrated.</li>
               <li>💡 Combine research principles with fairness concerns. This requires co-designing AI systems with said stakeholders.</li>
            </ul>
         </div>
      </div>


      </>
   );
};
export default DashboardPage;
