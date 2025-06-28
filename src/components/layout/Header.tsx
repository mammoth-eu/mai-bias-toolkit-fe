import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { header } from '../../assets/constants';
import { keycloak } from '../../main';
import AuthService from '../../services/AuthService';

const Header = React.memo(() => {
   return (
      <header>
         <nav
            className="navbar has-background-secondary is-align-items-center is-justify-content-space-between"
            role="navigation"
            aria-label="main navigation"
         >
            <div className="column"></div>


            <div className="column has-text-centered navbar-brand">
               <a href="/">
                  <img src={header['mammoth']} alt="logo" width="150" height="28" />
               </a>
            </div>

            <div className="column is-flex is-justify-content-right is-align-items-center">
               {keycloak.authenticated && (
                  <div className="has-text-primary-dark has-text-weight-bold is-flex is-flex-direction-column is-justify-content-center mr-3">
                     {AuthService.getCurrentUser()}
                  </div>
               )}
               <div className="buttons has-tooltip-multiline">
                  <button
                     className="button is-danger ml-2"
                     onClick={() => AuthService.logout()}
                     title="Logout"
                  >
                     <FontAwesomeIcon icon={faRightFromBracket} />&nbsp;<span>Logout</span>
                  </button>
               </div>
            </div>
         </nav>
      </header>
   );
});

export default Header;
