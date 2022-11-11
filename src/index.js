import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './MonstersOnly.css';
import { MonstersOnly } from './MonstersOnly'


const container = document.getElementById("root")
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <MonstersOnly />
  </BrowserRouter>
);

