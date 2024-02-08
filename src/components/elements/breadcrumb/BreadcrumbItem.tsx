import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {
   to?: string;
   className?: string;
   children: ReactElement;
}

const BreadcrumbItem: React.FC<Props> = ({ children, to, className = '' }) => {
   return (
      <React.Fragment>
         <li className={(!to ? ' is-active ' : ' ') + className}>
            {!to && (
               <span className="ml-2" aria-current="page">
                  {children}
               </span>
            )}
            {!!to && <Link to={to}>{children}</Link>}
         </li>
      </React.Fragment>
   );
};
export default BreadcrumbItem;
