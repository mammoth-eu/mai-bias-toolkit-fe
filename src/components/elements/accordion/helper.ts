import React, { ReactNode } from 'react';

interface PropsWithChildren {
   children: ReactNode;
}

export type ReactFCWithChildren = React.FC<PropsWithChildren>;
