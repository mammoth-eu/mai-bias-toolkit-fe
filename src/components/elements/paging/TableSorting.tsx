import { Order } from './model';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
   title: string;
   property: string;
   paging: any;
}

const TableSorting: React.FunctionComponent<Props> = ({ title, property, paging }) => {
   const icon = (order: Order) => {
      if (!order) return faSort;
      return order.isAsc ? faSortDown : faSortUp;
   };

   return (
      <a className="has-text-dark" onClick={() => paging.sort(property)}>
         {title} <FontAwesomeIcon icon={icon(paging.hasOrder(property))} />{' '}
      </a>
   );
};

export default TableSorting;
