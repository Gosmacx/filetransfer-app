import React from 'react'
import ReactDOM from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from './views/Home'
import File from './views/File'
import './assets/tailwind.css'

const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<File />} />
        </Routes>
  </HistoryRouter>
);