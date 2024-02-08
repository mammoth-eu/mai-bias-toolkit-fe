import React, { ReactElement } from 'react';

interface Props {
   isActive: boolean;
   children: ReactElement;
}
const MultistepFormStepWrapper: React.FC<Props> = ({ isActive, children }) => {
   return (
      <>
         <div className={'step-content has-text-centered ' + (isActive ? 'is-active' : '')}>{children}</div>
      </>
   );
};
export default MultistepFormStepWrapper;
