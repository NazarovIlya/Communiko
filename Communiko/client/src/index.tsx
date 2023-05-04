import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';
import './layout/style.css';
import { RepositoryContext, repository } from './Repository/Repository';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RepositoryContext.Provider value={repository}  >
    <RouterProvider router={router} />
  </RepositoryContext.Provider>
);
reportWebVitals();