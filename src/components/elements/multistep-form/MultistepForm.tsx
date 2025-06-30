import React, { FormEvent, ReactElement, useState } from 'react';
import { useMultistepForm } from './useMultistepForm';

type action = (data: any) => Promise<any>;

interface Props {
   steps: ReactElement[];
   markerSteps: ReactElement[];
   stepActions: action[];
   stepLoadings?: [boolean, (isLoading: boolean) => void][];
}

// todo: make it to submit data
const MultistepForm: React.FC<Props> = ({ steps, markerSteps, stepActions, stepLoadings }) => {
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
      stepActions[currentStepIndex](e)
         .then((res) => {
            if (!isLastStep && res) {
               stepLoadings && stepLoadings[currentStepIndex][1](true);
               return next();
            }
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
               <div className="mb-4">&nbsp;</div>
                  <div className="step-content is-active">{step}</div>
               <div className="mb-2">&nbsp;</div>
               </div>
               {stepLoadings && !stepLoadings[currentStepIndex][0] && (
                  <div className="steps-actions mt-6 mb-2">
                     <div className="steps-action">
                        {!isFirstStep && (
                           <button
                              type="button"
                              onClick={() => {
                                 back();
                                 stepLoadings[currentStepIndex][1](true);
                              }}
                              className={'column button is-secondary is-outlined is-medium ' + (isProcessing ? 'is-loading' : '')}
                           >
                              Back
                           </button>
                        )}
                     </div>
                     <div className="steps-action">
                        <button type="submit" className={'column button is-primary is-outlined is-medium ' + (isProcessing ? 'is-loading' : '')}>
                           {isLastStep ? 'Start' : 'Next'}
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </form>
      </>
   );
};
export default MultistepForm;
