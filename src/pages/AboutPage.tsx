import Portlet from '../components/elements/portlet/Portlet';
import logo from '../../public/trim-415585277-194ca892-0fd6-493b-8cf5-8ee70546f270.png';

const AboutPage = () => {
   return (
      <>
         <Portlet title="About">
            <img src={logo} alt="Official Mammoth Logo" style={{ maxWidth: '100%', width: '300px', height: 'auto' }} />
            <br />
            <br />
            <br />
            <p>
               <b>
                  <a href="https://github.com/mammoth-eu/mammoth-toolkit-releases" target="_blank">
                     MAI-BIAS Toolkit Github Repository
                  </a>
               </b>
            </p>
            <br/>
            <p>
               <b>
                  <a href="https://github.com/mammoth-eu/mammoth-commons" target="_blank">
                     Mammoth commons Github Repository
                  </a>
               </b>
            </p>
            <br/>
            <p>
               <b>
                  <a href="https://mammoth-ai.eu/" target="_blank">
                     Mammoth EU Project
                  </a>
               </b>
            </p>
         </Portlet>
      </>
   );
};
export default AboutPage;
