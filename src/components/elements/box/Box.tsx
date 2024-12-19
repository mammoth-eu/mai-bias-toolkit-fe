import React from 'react';

interface BoxProps {
   title: string;
   content: string;
}

const Box: React.FC<BoxProps> = ({ title, content }) => {
   return (
      <div className="box">
         <label className="title is-6">{title}</label>
         <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
      </div>
   );
};

export default Box;
