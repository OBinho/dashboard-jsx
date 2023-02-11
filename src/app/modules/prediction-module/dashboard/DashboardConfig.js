import i18next from 'i18next';

import en from './i18n/en';
import PredictionsPage from './PredictionsPage';
import SupermarketsPage from './SupermarketsPage';

i18next.addResourceBundle('en', 'predictionsPage', en);
i18next.addResourceBundle('en', 'supermarketsPage', en);

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'predictionspage',
      element: <PredictionsPage />,
    },
    {
      path: 'supermarketspage',
      element: <SupermarketsPage />,
    }
  ],
};

export default DashboardConfig;