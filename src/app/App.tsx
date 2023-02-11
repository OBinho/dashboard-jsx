//import './@mock-api';
import BrowserRouter from '../@fuse/core/BrowserRouter';
import FuseLayout from '../@fuse/core/FuseLayout';
import FuseTheme from '../@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
//import { selectCurrentLanguageDirection } from './stores/i18nSlice';
import { selectUser } from './stores/userSlice';
import themeLayouts from './theme-layouts/themeLayouts';
import { selectMainTheme } from './stores/fuse/settingsSlice.js';
import FuseAuthorization from '../@fuse/core/FuseAuthorization';
import settingsConfig from './configs/settingsConfig';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './modules/auth-module/utils/auth/AuthContext';

const emotionCacheOptions = {
    rtl: {
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
    ltr: {
        key: 'muiltr',
        stylisPlugins: [],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
};

function App() {
    const user = useSelector(selectUser);
    //const langDirection = useSelector(selectCurrentLanguageDirection);
    const mainTheme = useSelector(selectMainTheme);

    return (
        <div>funciona pelo amor de deus</div>
    );
};

export default App;