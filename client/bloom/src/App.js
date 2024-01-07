import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { CssBaseline, Box } from '@mui/material';
import './App.css';

import Header from './components/header';
import RegistrationPage from './components/register';
import LoginPage from './components/login';
import ProductsPage from './components/products';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1} sx={{ width: '100%' }}>
          <Routes>
              <Route path='/products' element={<ProductsPage></ProductsPage>}></Route>
              {!isAuth && <Route path='/registration' element={<RegistrationPage/>} />}
              {!isAuth && <Route path='/login' element={<LoginPage/>} />}
              {isAuth && <Route path="*" element={<Navigate to="/" />} />}
              {!isAuth && <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;