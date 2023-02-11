import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../modules/auth-module/sign-in/SignInConfig';
import SignUpConfig from '../modules/auth-module/sign-up/SignUpConfig';
import SignOutConfig from '../modules/auth-module/sign-out/SignOutConfig';
import Error404Page from '../modules/error-module/404/Error404Page';
import DashboardConfig from '../modules/prediction-module/dashboard/DashboardConfig';
import ContactsAppConfig from '../modules/supermarket-module/pages/ContactsAppConfig';

const routeConfigs = [DashboardConfig, ContactsAppConfig, SignOutConfig, SignInConfig, SignUpConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['ROLE_ADMIN','ROLE_GESTOR']),
  {
    path: '/',
    element: <Navigate to="/predictionspage" />,
    auth: ['ROLE_ADMIN','ROLE_GESTOR'],
  },
  {
    path: 'contacts',
    element: <Navigate to="contacts" />,
    auth: ['ROLE_ADMIN'],
  },  
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
