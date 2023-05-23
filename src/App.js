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
import { useCurrentUser } from './contexts/CurrentUserContext';
import WorkoutsPage from './pages/workouts/WorkoutsPage';
import WorkoutEditForm from './pages/workouts/WorkoutEditForm';
import ExerciseEditForm from './pages/exercises/ExerciseEditForm';


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const currentUser = useCurrentUser;
  const profile_id = currentUser?.profile_id || '';
  return (

        <div className={styles.App}>
          <NavBar/>
          <Container className={styles.Main}>
            <Switch>
              <Route exact path='/feed' render ={() => < WorkoutsPage message="No workouts were found"/>} />
              <Route exact path='/login' render ={() => <SignInForm />} />
              <Route exact path='/signup' render ={() => <SignUpForm />} />
              <Route exact path='/exercises/create' render ={() => <ExerciseCreateForm />} />
              <Route exact path='/exercises/:id/edit' render ={() => <ExerciseEditForm />} />
              <Route exact path='/exercises/:id' render ={() => <ExercisePage />} />
              <Route exact path='/workouts/' render ={() => < WorkoutsPage/>} />
              <Route exact path='/workouts/create' render ={() => < WorkoutCreateForm />} />
              <Route exact path='/workouts/:id/edit' render ={() => < WorkoutEditForm />} />
              <Route exact path='/workouts/:id' render ={() => <WorkoutPage />} />
              <Route render={()=><p>Page not found.</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;