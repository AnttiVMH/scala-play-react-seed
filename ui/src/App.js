import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

//import reactLogo from './images/react.svg';
//import playLogo from './images/play.svg';
//import scalaLogo from './images/scala.svg';
import Client from './Client';
import Form from './Form';

import './App.css';

const Tech = ({match}) => {
  return <div>Current Route: {match.params.tech}</div>
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', clubs: ''};
    this.Home = this.Home.bind(this);
    this.Clubs = this.Clubs.bind(this);
    this.viewClubs = this.viewClubs.bind(this);
  }

  async componentDidMount() {
    Client.getSummary(summary => {
      this.setState({
        title: summary
      });
    });
  }

  /**
   * Function for getting the clubs from backend database.
   */
  viewClubs() {
    Client.getClubs(c => {
      this.setState({
        clubs: c.clubs
      });
    });
  }

  /*
  We are using switch in render() so that we can navigate to separate pages.
   */

  render() {

    return (
      <Router>
        <div>

          <Switch>
            <Route exact path='/'>
              <this.Home />
            </Route>
            <Route path='/api/clubs'>
              <this.Clubs />
            </Route>
          </Switch>

        </div>
      </Router>
    );

  }

  /**
   * Function for showing the clubs page to the user.
   * @returns {*}
   * @constructor
   */
  Clubs() {
    let clubs = this.state.clubs ? this.state.clubs : [];
    let clubArray = [];
    for (let club in clubs[0]){
      clubArray.push(<p id={club}> {club}: {Array(clubs[0][club]).join(',')}</p>)
    }

    return (
      <div className='App'>
        <h1>Clubs</h1>
        {clubArray}
        <Link to='/'>
          <button type='button'>
            To Home Page
          </button>
        </Link>
      </div>
    );
  }

  /**
   * Function for showing the home page.
   * @returns {*}
   * @constructor
   */
  Home() {
    return (
      <div className='App'>
        <h1>Welcome to Club App</h1>
        <p>Please input your club details.</p>
        <Form/>
        <p> Or view existing clubs and their members.</p>
        <Link to='/api/clubs'>
          <button type='button' onClick={this.viewClubs.bind(this)}>
            View clubs
          </button>
        </Link>
      </div>
    );
  }

}

export default App;
