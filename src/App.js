import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import './api/axiosDefaults'
import SignInForm from './pages/auth/SignInForm';
import {createContext} from 'react';
import ExerciseCreateForm from './pages/exercises/ExerciseCreateForm';
import ExercisePage from './pages/exercises/ExercisePage';
import WorkoutPage from './pages/workouts/WorkoutPage';
import WorkoutCreateForm from './pages/workouts/WorkoutCreateForm';
import WorkoutCreateForm2 from './pages/workouts/WorkoutCreateForm2';


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  
  return (

        <div className={styles.App}>
          <NavBar/>
          <Container className={styles.Main}>
            <Switch>
              <Route exact path='/' render ={() => <h1>Main page</h1>} />
              <Route exact path='/login' render ={() => <SignInForm />} />
              <Route exact path='/signup' render ={() => <SignUpForm />} />
              <Route exact path='/exercises/create' render ={() => <ExerciseCreateForm />} />
              <Route exact path='/exercises/:id' render ={() => <ExercisePage />} />
              <Route exact path='/workouts/create' render ={() => < WorkoutCreateForm2 />} />
              <Route exact path='/workouts/:id' render ={() => <WorkoutPage />} />
              <Route render={()=><p>Page not found.</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;