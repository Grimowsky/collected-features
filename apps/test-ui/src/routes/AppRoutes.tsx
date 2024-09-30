import React from 'react';
import { routes } from './routes.schema';
import { Route, Routes } from 'react-router-dom';
import {Button} from "@shared-ui/components/ui/button";

export const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route
        path={routes.BASE_ROUTE}
        element={
          <div className={'h-screen text-black-500 text-2xl'}>hello there
          <Button>hello x2</Button>
          </div>
        }
      />
    </Routes>
  );
};
