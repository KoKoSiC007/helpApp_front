import React from 'react';
import './App.css';
import {Header, OrganizationsList} from "./components";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Header />
            <div id="main">
                <Route path="/organizations">
                    <OrganizationsList organizations={[]}/>
                </Route>
            </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
