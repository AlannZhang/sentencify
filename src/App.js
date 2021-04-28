import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import LoginScreen from './components/login';
import CreatePlaylist from './components/createPlaylist';
import RedirectPage from './components/redirect';

const App = () => (
  <div>
    <Router>
    <Container fluid style={{ paddingLeft: 10, paddingRight: 10 }}>
      <div className="main">
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route path='/callback' component={RedirectPage} />
          <Route path='/create' component={CreatePlaylist} />
        </Switch>
      </div>
    </Container>
    </Router>
  </div>
);

export default App;
