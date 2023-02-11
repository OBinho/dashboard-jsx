import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Management',
    subtitle: 'Ferramentas de Gestão',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'ADMINISTRADOR',
    children: [      
      {
        id: 'supermarkets-component',
        title: 'Supermarkets',
        translate: 'Supermercados',
        type: 'item',
        icon: 'heroicons-outline:building-storefront',
        url: 'contacts',
      }
    ]
  },
  {
    id: 'predictions-component',
    title: 'Predictions',
    translate: 'Previsões',
    type: 'item',
    icon: 'heroicons-outline:chart-pie',
    url: 'predictionspage', 
  }
];

export default navigationConfig;
