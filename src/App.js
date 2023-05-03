import logo from './logo.svg';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render ={() => <h1>Main page</h1>} />
          <Route exact path='/login' render ={() => <h1>Log in</h1>} />
          <Route exact path='/signup' render ={() => <h1>Sign up</h1>} />
          <Route render={()=><p>Page not found.</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;