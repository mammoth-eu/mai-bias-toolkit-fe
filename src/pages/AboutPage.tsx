import Portlet from '../components/elements/portlet/Portlet';

const AboutPage = () => {
   return (
      <>
         <Portlet title="About">
            <p>
               <b>
                  <a href="https://github.com/mammoth-eu/mammoth-toolkit-releases" target="_blank">
                     Mammoth toolkit Github Repository
                  </a>
               </b>
            </p>
            <br />
            <p>
               <b>
                  <a href="https://github.com/mammoth-eu/mammoth-commons" target="_blank">
                     Mammoth commons Github Repository
                  </a>
               </b>
            </p>
            <br />
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
