import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import SigninPage from "./pages/signinPage";
import SignupPage from "./pages/signupPage";
import MainPage from "./pages/mainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/main" component={MainPage} />
      </Switch>
    </BrowserRouter>

  );
}
export default App;