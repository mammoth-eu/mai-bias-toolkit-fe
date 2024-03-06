import { ReactFCWithChildren } from './helper';

const Accordion: ReactFCWithChildren = ({ children }) => {
   return (
      <>
         <section className="accordions">{children}</section>
      </>
   );
};
export default Accordion;
