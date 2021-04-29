import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import LoginScreen from './components/login';
import CreatePlaylist from './components/createPlaylist';
import RedirectPage from './components/redirect';

const App = () => (
  <Router>
    <Container className="App" fluid style={{ paddingLeft: 5, paddingRight: 5 }}>
      <Switch>
        <Route exact path='/' component={LoginScreen} />
        <Route path='/callback' component={RedirectPage} />
        <Route path='/create' component={CreatePlaylist} />
      </Switch>
    </Container>
  </Router>
);

export default App;
