import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import App from './layout/App';
import reportWebVitals from './reportWebVitals';
import './layout/style.css';
import { RepositoryContext, repository } from './Repository/Repository';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RepositoryContext.Provider value={repository}  >
    <App />
  </RepositoryContext.Provider>
);
reportWebVitals();