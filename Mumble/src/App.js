import React, { Component } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import './index.css';
import Home from './pages/Home';
import Auth from './pages/auth';
import Meeting from './pages/meeting';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/auth' element={<Auth/>} />
            <Route path='/:roomID' element={<Meeting/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
