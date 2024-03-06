import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/style.css';
import { useKeycloak } from './services/useKeycloak';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const keycloak = await useKeycloak();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
