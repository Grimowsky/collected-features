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
            <Button variant='default'> hello </Button>
        }
      />
    </Routes>
  );
};
