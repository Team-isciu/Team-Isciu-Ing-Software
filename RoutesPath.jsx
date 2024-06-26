import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserArea from './userArea';
import Home from './Home'
const RoutesPath = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/UserArea" element={<UserArea />} />
    </Routes>
  );
};

export default RoutesPath;