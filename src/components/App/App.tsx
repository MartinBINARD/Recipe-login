import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRecipes } from '../../store/reducers/recipes';

import Menu from '../Menu';
import Home from '../Home';
import Favorites from '../Favorites';
import Recipe from '../Recipe';
import Error from '../Error';

import Loading from './Loading';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const loading = useAppSelector((state) => state.recipes.loading);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // à chaque changement de page

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:slug" element={<Recipe />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
