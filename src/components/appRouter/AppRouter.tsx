import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../../pages/dashboard';
import TimeCounterDetails from '../../pages/timeCounterDetails';


const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Dashboard />} />
      <Route path={'/:id'} element={<TimeCounterDetails />} />
    </Routes>
  );
};

export default AppRouter;