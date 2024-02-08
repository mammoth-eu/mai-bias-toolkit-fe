import React, { ReactElement } from 'react';
import Placeholder from '../placeholder/Placeholder';

interface Props {
   title?: string;
   subtitle?: string;
   actions?: ReactElement;
   footer?: ReactElement;
   hideFooter?: boolean;
   noPadding?: boolean;
   isLoading?: boolean;
   placeholder?: string;
   children: any;
   style?: React.CSSProperties;
}

const Portlet: React.FC<Props> = ({
   title,
   subtitle,
   actions,
   footer,
   hideFooter,
   noPadding = false,
   isLoading = false,
   placeholder = 'm|m|m',
   style = {},
   children
}) => {
   return (
      <div className="portlet has-background-white has-radius has-shadow-normal" style={style}>
         {(!!title || !!actions) && (
            <div className="p-header">
               {!!title && (
                  <div className="title is-size-5-touch is-size-4-desktop">
                     {title}{' '}
                     {subtitle && <span className="subtitle has-text-weight-normal has-text-grey">({subtitle})</span>}
                  </div>
               )}
               {!!actions && <div className="actions is-flex is-justify-content-center">{actions}</div>}
            </div>
         )}

         <div className={'p-body is-clearfix' + (noPadding ? ' is-paddingless' : '')}>
            {isLoading ? <Placeholder format={placeholder} /> : <React.Fragment>{children}</React.Fragment>}
         </div>

         {!hideFooter && !!footer && (
            <div className="p-footer">
               <div className="left" />
               <div className="right">{footer}</div>
            </div>
         )}
      </div>
   );
};
export default Portlet;
