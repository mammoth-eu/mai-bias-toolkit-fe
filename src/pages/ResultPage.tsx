import { useDecodedUrl } from '../utils/utils.ts';

const ResultPage = () => {
   const { decodedUrl, errorMessage } = useDecodedUrl('resultUrl');
   return errorMessage ? (
      <div className="container">
         <br />
         <div className="has-text-centered">
            <h2 className="title is-4 has-text-danger">Oops! Something went wrong.</h2>
            <p className="subtitle is-6">{errorMessage}</p>
         </div>
      </div>
   ) : (
      <div style={{ height: '100vh', width: '100%' }}>
         <iframe src={decodedUrl} title="Kubeflow Pipelines" width="100%" height="100%" style={{ border: 'none' }} />
      </div>
   );
};
export default ResultPage;
