import React from 'react';
// import { sanitizeContent } from '../../../utils/utils.ts';

interface BoxProps {
   title: string;
   content: string;
}

const Box: React.FC<BoxProps> = ({ title, content }) => {
   // Sanitization is not something that we can allow if we are going to allow html module descriptions.
   return (
      <div className="box">
         <label className="title is-6">{title}</label>
         {/* <p style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }} /> */}
         <p dangerouslySetInnerHTML={{ __html: (content) }} /> 
      </div>
   );
};

export default Box;
