import React, { ReactElement, ReactNode } from "react";

interface Props {
    className?: string
    children: ReactNode
}

const Breadcrumb: React.FC<Props> = ({className = 'has-succeeds-separator', children}) => {
    return (<nav className={'breadcrumb ' + className} aria-label="breadcrumbs">
        <ul>
            {children}
        </ul>
    </nav>)
};
export default Breadcrumb;