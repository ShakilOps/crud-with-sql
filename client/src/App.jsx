import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position='center'/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/addContact" component={AddEdit} />
          <Route path="/update/:id" component={AddEdit} />
          <Route path="/view/:id" component={View} />
        </Switch>
      </div>
  </BrowserRouter>
  );
}

export default App;