import React from 'react';
import { routes } from './routes.schema';
import { Route, Routes } from 'react-router-dom';
import { LikesPage } from '../pages/likes';

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={routes.BASE_ROUTE} element={<LikesPage />} />
    </Routes>
  );
};
