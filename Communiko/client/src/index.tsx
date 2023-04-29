import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import App from './layout/App';
import reportWebVitals from './reportWebVitals';
import './layout/style.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
reportWebVitals();