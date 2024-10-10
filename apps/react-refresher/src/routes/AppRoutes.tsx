import React from 'react';
import { routes } from './routes.schema';
import { Route, Routes } from 'react-router-dom';
import { UseMemoPage } from '../pages/use-memo.page';
import { RerenderPage } from '../pages/rerender.page';

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route
        path={routes.BASE_ROUTE}
        element={
          <div className={'h-screen text-black-500 text-2xl'}>hello there</div>
        }
      />
      <Route path={routes.USE_MEMO} element={<UseMemoPage />} />
      <Route path={routes.RERENDERS} element={<RerenderPage />} />
    </Routes>
  );
};
