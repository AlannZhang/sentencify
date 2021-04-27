// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import LoginScreen from './components/login';
import CreatePlaylist from './components/createPlaylist';
// import NavBar from './components/navbar';
import RedirectPage from './components/redirect';

const App = () => (
  <div>
    <Router>
    <Container>
      {/* <NavBar /> */}
      <div className="main">
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route path='/callback' component={RedirectPage} />
          <Route path='/create' component={CreatePlaylist} />
          {/*
          <Route exact path='/logout'>
            <Redirect to='/'/>
          </Route>s
          */}
        </Switch>
      </div>
    </Container>
    </Router>
  </div>
);

export default App;
