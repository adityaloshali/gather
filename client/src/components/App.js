import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
           <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/surveys/new" component={SurveyNew} />
              <Route path="/surveys" component={Dashboard} />
            </Switch>
           </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;