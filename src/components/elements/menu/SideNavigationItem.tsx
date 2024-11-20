import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { getIsActive } from '../../helper.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import { noBorderBottom } from '../styles/styles';

interface Props {
   to: string;
   path: string;
   icon: IconDefinition;
   tooltip?: string;
   pathOptions?: string[];
   showFull?: boolean;
}

const SideNavigationItem: React.FC<Props> = ({ to, path, icon, tooltip, pathOptions, showFull = false }) => {
   const isNavActive = () => {
      if (!pathOptions) {
         return getIsActive(path, to);
      }

      let isActive = '';
      pathOptions.forEach((p) => (isActive += getIsActive(p, to)));
      return isActive;
   };

   return (
      <Link to={to}>
         <span
            className="has-tooltip-arrow has-tooltip-right"
            data-tooltip={!!tooltip && tooltip}
            style={noBorderBottom}
         >
            <span className={isNavActive() + ' button is-text'}>
               <FontAwesomeIcon icon={icon} />
               {showFull && <span>&nbsp;{tooltip}</span>}
            </span>
         </span>
      </Link>
   );
};
export default SideNavigationItem;
