import React, { FormEvent, ReactElement, useState } from 'react';
import { useMultistepForm } from './useMultistepForm';

type action = (data: any) => Promise<any>;

interface Props {
   steps: ReactElement[];
   markerSteps: ReactElement[];
   stepActions: action[];
}

// todo: make it to submit data
const MultistepForm: React.FC<Props> = ({ steps, markerSteps, stepActions }) => {
   const [isProcessing, setIsProcessing] = useState<boolean>(false);
   const { step, currentStepIndex, isFirstStep, isLastStep, next, back } = useMultistepForm(steps);

   const onSubmit = (e: FormEvent) => {
      e.preventDefault();

      setIsProcessing(true);
      // if (!stepActions[currentStepIndex](e)) {
      //     setIsProcessing(false)
      //     return
      // }
      // setIsProcessing(false)

      // if (!isLastStep) return next()
      // console.log(stepActions[currentStepIndex](e))
      stepActions[currentStepIndex](e)
         .then((res) => {
            if (!isLastStep && res) return next();
         })
         .finally(() => setIsProcessing(false));
   };

   return (
      <>
         <form onSubmit={onSubmit}>
            <div className="steps" id="stepsDemo">
               {!!markerSteps &&
                  markerSteps.map((e, i) => {
                     return (
                        <div
                           key={i}
                           className={
                              'step-item ' +
                              (i === currentStepIndex ? 'is-active is-primary' : '') +
                              (i < currentStepIndex ? 'is-primary is-completed' : '')
                           }
                        >
                           {e}
                        </div>
                     );
                  })}
               <div className="steps-content">
                  <div className="step-content is-active">{step}</div>
               </div>
               <div className="steps-actions">
                  <div className="steps-action">
                     {!isFirstStep && (
                        <button
                           type="button"
                           onClick={back}
                           className={'button is-secondary ' + (isProcessing ? 'is-loading' : '')}
                        >
                           Back
                        </button>
                     )}
                  </div>
                  <div className="steps-action">
                     <button type="submit" className={'button is-primary ' + (isProcessing ? 'is-loading' : '')}>
                        {isLastStep ? 'Start' : 'Next'}
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </>
   );
};
export default MultistepForm;
