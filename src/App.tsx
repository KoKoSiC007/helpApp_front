import React from 'react';
import './App.css';
import {Header, OrganizationsList} from "./components";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import ClientList from "./components/client";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Header />
            <div id="main">
                <Route path="/organizations">
                    <OrganizationsList />
                </Route>
                <Route path="/clients">
                    <ClientList />
                </Route>
            </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
