import React, { ReactElement } from 'react';

interface Props {
   title: string;
   isActive: boolean;
   onClick: () => void;
   children: ReactElement;
}

const AccordionItem: React.FC<Props> = ({ title, isActive, onClick, children }) => {
   return (
      <>
         <article className={'accordion ' + (isActive ? 'is-active' : '')}>
            <div className="accordion-header toggle" onClick={onClick}>
               <p>{title}</p>
            </div>
            <div className="accordion-body">
               <div className="accordion-content">{children}</div>
            </div>
         </article>
      </>
   );
};
export default AccordionItem;
