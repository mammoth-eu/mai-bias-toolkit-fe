import React from 'react';

interface Props {
   step: number;
   title?: string;
}

const MultistepMarker: React.FC<Props> = ({ step, title }) => {
   return (
      <>
         <div className="step-marker">{step}</div>
         {!!title && (
            <div className="step-details">
               <p className="step-title">{title}</p>
            </div>
         )}
      </>
   );
};
export default MultistepMarker;
