import React from 'react';
import { routes } from './routes.schema';
import { Route, Routes } from 'react-router-dom';
import { UploadPage } from '../pages/upload.page';

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={routes.BASE_ROUTE} element={<UploadPage />} />
    </Routes>
  );
};
