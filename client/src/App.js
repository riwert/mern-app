import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import AppFooter from './components/AppFooter';
import ItemList from './components/ItemList';
import ItemModal from './components/ItemModal';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <ItemModal />
          <ItemList />
          <AppFooter />
        </div>
      </Provider>
    );
  }
}

export default App;
