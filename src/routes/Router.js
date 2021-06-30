import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
/* import CreatePostPage from "../pages/CreatePostPage/CreatePostPage";
import FeedPage from "../pages/FeedPage/FeedPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PostPage from "../pages/PostPage/PostPage"; */
import SignUpPage from "../pages/SignUpPage/SignUpPage";
/* import ErrorPage from "../pages/ErrorPage/ErrorPage"; */
import Header from "../components/Header/Header.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
{/*         <Route exact path="/login">
          <LoginPage />
        </Route> */}
        <Route exact path="/user/signup">
          <SignUpPage />
        </Route>
{/*         <Route exact path="/">
          <FeedPage />
        </Route>
        <Route exact path="/post/:id">
          <PostPage />
        </Route>
        <Route exact path="/createpost">
          <CreatePostPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
