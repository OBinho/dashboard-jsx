import Provider from 'react-redux/es/components/Provider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from 'app/configs/routesConfig';
import store from './stores';
import AppContext from './AppContext';

const withAppProviders = (Component) => (props) => {
    const WrapperComponent = () => (
        <AppContext.Provider
            value={{
                routes,
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Provider store={store}>
                    <StyledEngineProvider injectFirst>
                        <Component {...props} />
                    </StyledEngineProvider>
                </Provider>
            </LocalizationProvider>
        </AppContext.Provider>
    );

    return WrapperComponent;
};

export default withAppProviders;