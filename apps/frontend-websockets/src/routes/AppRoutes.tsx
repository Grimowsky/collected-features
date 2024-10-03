import React from 'react';
import { routes } from './routes.schema';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LikesPage } from '../pages/likes';

function getRandomUserId(): number {
  return Math.floor(Math.random() * 100) + 1;
}

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={`${routes.BASE_ROUTE}/:id`} element={<LikesPage />} />
      <Route path="*" element={<Navigate to={`/${getRandomUserId()}`} />} />
    </Routes>
  );
};
