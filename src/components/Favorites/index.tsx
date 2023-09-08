import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Page from '../Page';
import AppHeader from '../AppHeader';
import Content from '../Content';
import { fetchFavorites } from '../../store/reducers/recipes';

function Favorites() {
  const pseudo = useAppSelector((state) => state.user.pseudo);
  const favorites = useAppSelector((state) => state.recipes.favorites);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // if (!pseudo) {
  //   return <Navigate to="/" replace />;
  // }

  useEffect(() => {
    if (!pseudo) {
      navigate('/', { replace: true });
    } else {
      dispatch(fetchFavorites());
    }
  }, [dispatch, navigate, pseudo]);

  return (
    <Page>
      <AppHeader />
      <Content
        title="Mes recettes préférées"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, explicabo."
        recipes={favorites}
      />
    </Page>
  );
}

export default Favorites;
