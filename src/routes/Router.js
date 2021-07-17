import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FeedPage from "../pages/FeedPage/FeedPage";
import LoginPage from "../pages/LoginPage/LoginPage";

import Header from "../components/Header/Header.js";

import CreatePhotoPage from "../pages/CreatePostPage/CreatePhotoPage";
import CreateCollectionPage from "../pages/CreateCollectionPage/CreateCollectionPage";
import CollectionsPage from "../pages/CollectionsPage/CollectionsPage";
import CollectionDetailsPage from "../pages/CollectionDetailsPage/CollectionDetailsPage";

import SearchPage from "../pages/SearchPage/SearchPage";

/*
import PostPage from "../pages/PostPage/PostPage"; 



 import ErrorPage from "../pages/ErrorPage/ErrorPage"; */

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/">
          <FeedPage />
        </Route>
        <Route exact path="/createphoto">
          <CreatePhotoPage />
        </Route>
        <Route exact path="/createcollection">
          <CreateCollectionPage />
        </Route>
        <Route exact path="/collections">
          <CollectionsPage />
        </Route>
        <Route exact path="/collection/:id">
          <CollectionDetailsPage />
        </Route>
        <Route exact path="/search/:search">
          <SearchPage />
        </Route>
        {/*         
       
      
        <Route>
          <ErrorPage />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
