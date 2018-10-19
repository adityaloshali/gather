import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import actions from '../redux/actions'

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render() {
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
    )
  }
}


export default connect(null, actions)(App);
