import { useEffect } from 'react';

const useKeyHandler = (
   element: Node,
   keyCode: string,
   event: 'keydown' | 'keyup' | 'keyPressed',
   method: () => any
) => {
   const onEvent = (event: any) => {
      if (event.code === keyCode && !!method) method();
   };

   useEffect(() => {
      element.addEventListener(event, onEvent, false);

      return () => {
         element.removeEventListener(event, onEvent, false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return {};
};

export default useKeyHandler;
