//CSS
//REACT
import React /*, { useEffect }*/ from "react";
import Helmet from "react-helmet";
//ROUTER
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import "./App.scss";
import { useColors } from "./colors";
import { Posts } from "./components/Posts";
//LOADING
import { Loading } from "./Loading";
import { store } from "./redux/store";
//COOKIES MANAGER
// import { cookies } from "./cookies";
//ROUTING
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import ResetPass from "./components/ResetPass";
// import Dashboard from "./components/Dashboard";
// import NotFound from "./components/NotFound";
import ProtectedPath from "./RouteProtection/ProtectedPath";

function App({ isLoading }) {
  require("dotenv").config();
  const colors = useColors();

  // useEffect(() => {
  //   const token = cookies.getCookie("token")
  // }, [auth.isLogged, history])

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {/* <Navbar />
    <RightBar /> */}
      <Helmet>
        <style>{`body { background-color: ${colors.black}; }`}</style>
      </Helmet>
      <div
        style={{
          color: colors.white,
          cursor: "pointer",
          position: "fixed",
          top: 0,
          left: 0,
        }}
        onClick={() =>
          store.dispatch({
            type: "SWITCH_MODE",
          })
        }
      >
        SWITCH MODE
      </div>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/signup" render={() => <p>HELLO</p>} />
        <Route path="/login" render={() => <p>HELLO</p>} />
        <Route path="/resetpass" render={() => <p>HELLO</p>} />
        <ProtectedPath path="/home">
          <p>HOME</p>
        </ProtectedPath>
        {/* <ProtectedPath path="/posts" component={Posts} /> */}
        <Route path="/posts" component={Posts} />
        <Route path="/logout" render={() => <p>Loggin out</p>} />
        <Route path="*" render={() => <p>Not Found</p>} />
      </Switch>
    </>
  );
}

export default withRouter(App);
