import { Provider } from 'react-redux';

import { store } from './config/redux/store';

import AuthProvider from './router/AuthProvider';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider />
    </Provider>
  );
};

export default App;
