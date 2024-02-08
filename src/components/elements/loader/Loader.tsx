import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
   return (
      <div className="spinner-container">
         <div className="loading-spinner"></div>
      </div>
   );
};
export default Loader;
