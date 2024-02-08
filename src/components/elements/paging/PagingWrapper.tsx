import React, { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SingleValueFilterItem } from './model';

interface Props {
   paging: any;
   ref: React.Ref<FilterFormHandler>;
   children: any;
}

export interface FilterFormHandler {
   form: any;
   reset: () => void;
   submit: () => void;
   findFilterValue: any;
}

const PagingWrapper: React.FC<Props> = React.forwardRef(({ paging, ref, children }) => {
   const form = useForm();
   const formElement = useRef<any>();

   useImperativeHandle(ref, () => {
      return {
         form: form,
         reset: () => reset(0),
         submit: submit,
         findFilterValue: (name: string) => findFilterValue(name)
      };
   });

   const reset = (to: number) => {
      form.reset();
      formElement.current!.reset();
      paging.reset(to);
   };

   const findFilterValue = (name: string) => {
      console.log(name);
      const filter = paging.findFilter(name);
      return filter ? filter.value : '';
   };

   const onSubmit = (data: Record<string, string>, e?: any) => {
      console.log(e);
      if (e) {
         e.preventDefault();
      }
      console.log(data);
      const filters: SingleValueFilterItem[] = [];
      const keyNames = Object.keys(data);
      if (keyNames) {
         keyNames.forEach((name) => {
            filters.push({ name: name, value: data[name] });
         });
         paging.filters(filters);
      }
   };

   const submit = () => {
      onSubmit(form.getValues());
   };

   return (
      <form
         id="filterForm"
         // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
         onSubmit={form.handleSubmit(onSubmit)}
         ref={formElement}
      >
         {children}
      </form>
   );
});
export default PagingWrapper;
