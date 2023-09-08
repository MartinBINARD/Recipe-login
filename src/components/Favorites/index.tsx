import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import Page from '../Page';
import AppHeader from '../AppHeader';
import Content from '../Content';

function Favorites() {
  const pseudo = useAppSelector((state) => state.user.pseudo);

  if (!pseudo) {
    return <Navigate to="/error" replace />;
  }

  return (
    <Page>
      <AppHeader />
      <Content
        title="Mes recettes préférées"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, explicabo."
        recipes={[]}
      />
    </Page>
  );
}

export default Favorites;
