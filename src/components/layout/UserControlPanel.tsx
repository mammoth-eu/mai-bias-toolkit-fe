import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import SideNavigationItem from '../elements/menu/SideNavigationItem';
import useWindowDimensions from '../elements/window-dimensions/useWindowDimensions';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
   children: ReactElement;
}

const UserControlPanel: React.FC<Props> = React.memo(({ children }) => {
   const { pathname } = useLocation();
   const { width } = useWindowDimensions();
   const isTablet = () => width <= 768;

   return (
      <>
         <div className="columns is-centered mx-1">
            <div
               className="column is-narrow has-background-sidebar mb-0 px-0 has-text-centered"
               style={isTablet() ? {} : { minHeight: '85vh' }}
            >
               <aside className="menu mt-3">
                  <ul className="menu-list">
                     <li>
                        <SideNavigationItem
                           to="/"
                           path={pathname}
                           icon={faHouse}
                           tooltip="Dashboard"
                           showFull={isTablet()}
                        />
                     </li>
                     <li>
                        <SideNavigationItem
                           to="/component"
                           path={pathname}
                           icon={faPuzzlePiece}
                           tooltip="Modules"
                           showFull={isTablet()}
                        />
                     </li>
                     <li>
                        <SideNavigationItem
                           to="/users"
                           path={pathname}
                           icon={faUsers}
                           tooltip="Users"
                           showFull={isTablet()}
                        />
                     </li>
                     <li>
                        <a
                           href="https://mammoth-eu.github.io/mammoth-commons"
                           target="_blank"
                           rel="noopener noreferrer"
                           title="Catalogue"
                           className="button is-ghost is-fullwidth has-text-left mt-2"
                        >
                           <FontAwesomeIcon icon={faCircleQuestion} className={isTablet() ? "mr-2" : ""} />
                           {isTablet() && "Modules"}
                        </a>
                     </li>
                     {/* <li>
                        <a
                           href="https://github.com/mammoth-eu/mammoth-toolkit-releases"
                           target="_blank"
                           rel="noopener noreferrer"
                           title="Repository"
                           className="button is-ghost is-fullwidth has-text-left mt-2"
                        >
                           <FontAwesomeIcon icon={faPenToSquare} className={isTablet() ? "mr-2" : ""} />
                           {isTablet() && "Repository"}
                        </a>
                     </li>
                     <li>
                        <a
                           href="https://mammoth-ai.eu/"
                           target="_blank"
                           rel="noopener noreferrer"
                           title="MAMMOth"
                           className="button is-ghost is-fullwidth has-text-left mt-2"
                        >
                           <FontAwesomeIcon icon={faBookOpen} className={isTablet() ? "mr-2" : ""} />
                           {isTablet() && "MAMMOth"}
                        </a>
                     </li> */}
                  </ul>
               </aside>
            </div>
            <div className="column mr-2 mb-2">{children}</div>
         </div>
      </>
   );
});
export default UserControlPanel;
