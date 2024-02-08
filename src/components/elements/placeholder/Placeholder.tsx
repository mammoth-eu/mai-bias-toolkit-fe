import React from 'react';

interface Props {
   format?: string;
}

export const formTemplate = () => {
   return 'f|f|f,f|f|f';
};

export const tableTemplate = () => {
   return 'l|l|l,l|l|l,l|l|l';
};

const Placeholder: React.FC<Props> = ({ format = tableTemplate() }) => {
   const s = () => {
      return (
         <span className="content-placeholder" style={{ width: '20%' }}>
            &nbsp;
         </span>
      );
   };

   const m = () => {
      return (
         <span className="content-placeholder" style={{ width: '50%' }}>
            &nbsp;
         </span>
      );
   };

   const l = () => {
      return (
         <span className="content-placeholder" style={{ width: '100%' }}>
            &nbsp;
         </span>
      );
   };

   const f = () => {
      return (
         <div className="control">
            <label className="label m-m-bottom">{s()}</label>
            <div className="panel content-placeholder" style={{ width: '100%' }}>
               &nbsp;
            </div>
         </div>
      );
   };

   // map placeholder
   const p = () => {
      return (
         <div className="control">
            <div className="panel content-placeholder" style={{ width: '100%', minHeight: '400px' }}>
               &nbsp;
            </div>
         </div>
      );
   };

   const render = (element: string) => {
      switch (element) {
         case 's':
            return s();
         case 'm':
            return m();
         case 'l':
            return l();
         case 'f':
            return f();
         case 'p':
            return p();
      }
   };

   const parse = (expression: string) => {
      if (!expression) return <div />;
      const lines = expression.split(',');
      return (
         <React.Fragment>
            <div className="panel columns is-multiline is-8-widescreen">
               {lines.map((line, lindex) => {
                  const elements = line.split('|');
                  const className =
                     elements.length > 2 ? 'is-one-third-fullhd' : elements.length === 2 ? 'is-half-fullhd' : '';
                  return elements.map((element, index) => {
                     return (
                        <div key={'field_' + lindex + '_' + index} className={'column is-12 ' + className}>
                           {render(element)}
                        </div>
                     );
                  });
               })}
            </div>
         </React.Fragment>
      );
   };

   return (
      <React.Fragment>
         {parse(format)}
         {/* <div className="placeholder-content">
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
                <div className="placeholder-content_item"></div>
            </div> */}
      </React.Fragment>
   );
};

export default Placeholder;
