//CSS
import "./App.scss";

//ROUTER
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

//REACT
import React, { useEffect }/*, { useEffect }*/ from "react";

//LOADING
import {Loading} from "./Loading"

//COOKIES MANAGER
// import { cookies } from "./cookies";

//ROUTING
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import ResetPass from "./components/ResetPass";
// import Dashboard from "./components/Dashboard";
// import NotFound from "./components/NotFound";
import ProtectedPath from "./RouteProtection/ProtectedPath"
import { Posts } from "./components/Posts";

function App({ isLoading }) {
  require("dotenv").config();


  // useEffect(() => {
  //   const token = cookies.getCookie("token")
  // }, [auth.isLogged, history])

  return isLoading ? (
    <Loading />
  ) : (
    <>
    {/* <Navbar />
    <RightBar /> */}
    <Switch>
      <Route path="/" exact render={()=><Redirect to="/login" />} />
      <Route path="/signup" render={()=><p>HELLO</p>} />
      <Route path="/login" render={()=><p>HELLO</p>} />
      <Route path="/resetpass" render={()=><p>HELLO</p>} />
      <ProtectedPath path="/home">
        <p>HOME</p>
      </ProtectedPath>
      <ProtectedPath path="/posts" component={Posts}/>
      <Route path="/logout" render={()=><p>Loggin out</p>} />
      <Route path="*" render={()=><p>Not Found</p>} />
    </Switch>
    </>
  );
}

export default withRouter(App)