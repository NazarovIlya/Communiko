import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';
import 'react-calendar/dist/Calendar.css'
import './layout/style.css';
import 'react-toastify/dist/ReactToastify.css';

import { RepositoryContext, repository } from './repository/Repository';
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