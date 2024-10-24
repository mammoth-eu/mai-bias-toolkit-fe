import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import SideNavigationItem from '../elements/menu/SideNavigationItem';
import useWindowDimensions from '../elements/window-dimensions/useWindowDimensions';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

interface Props {
   children: ReactElement;
}

const UserControlPanel: React.FC<Props> = React.memo(({ children }) => {
   const { pathname } = useLocation();

   const { width } = useWindowDimensions();
   const isTablet = () => {
      return width <= 768;
   };

   return (
      <>
         <div className="columns is-centered mx-1">
            <div
               className={'column is-narrow has-background-sidebar mb-3 px-0 has-text-centered'}
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
                           to="/dataset"
                           path={pathname}
                           icon={faFile}
                           tooltip="Dataset Bias Detection"
                           showFull={isTablet()}
                        />
                     </li>
                     <li>
                        <SideNavigationItem
                           to="/model"
                           path={pathname}
                           icon={faDiagramProject}
                           tooltip="Model Exploration"
                           showFull={isTablet()}
                        />
                     </li>
                     <li>
                        <SideNavigationItem
                           to="/runs"
                           path={pathname}
                           icon={faList}
                           tooltip="Runs"
                           showFull={isTablet()}
                        />
                     </li>
                     <li>
                        <SideNavigationItem
                           to="/component"
                           path={pathname}
                           icon={faPuzzlePiece}
                           tooltip="Import Component"
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
                  </ul>
               </aside>
            </div>
            <div className="column mr-2 mb-2">{children}</div>
         </div>
      </>
   );
});
export default UserControlPanel;
