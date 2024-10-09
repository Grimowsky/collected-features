import React from 'react';
import { routes } from './routes.schema';
import { Route, Routes } from 'react-router-dom';
import { UploadPage } from '../pages/upload.page';
import { FileList } from '../pages/file-list.page';

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={routes.BASE_ROUTE} element={<UploadPage />} />
      <Route path={routes.FILES_LIST} element={<FileList />} />
    </Routes>
  );
};
