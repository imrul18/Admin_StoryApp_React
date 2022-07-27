import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "core/Loader.js";
import { LoaderContext } from "context/LoaderContext.js";
import { StyleProvider } from "context/StyleContext.js";

import Header from "pageLayout/Header.js";

import Dashboard from "views/admin/Dashboard.js";
import Categories from "views/admin/categories/Categories.js";
import EditCategory from "views/admin/categories/EditCategory.js";
import CreateCategories from "views/admin/categories/CreateCategories.js";
import Stories from "views/admin/stories/Stories.js";
import EditStories from "views/admin/stories/EditStories.js";
import CreateStories from "views/admin/stories/CreateStories.js";

export default function Admin() {
  const { loading, setLoading } = React.useContext(LoaderContext);
  const [menuCollapse, setMenuCollapse] = useState(true);
  return (
    <div className="h-screen overflow-y-scroll bg-individualPageBG">
      <StyleProvider>
        <Loader loading={loading} />
        <Header menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse} />

        <div
          className={`${
            menuCollapse ? "md:ml-20" : "md:ml-67.5"
          } transition-all duration-200 ease-linear relative overflow-hidden`}
        >
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />

            <Route path="/categories" exact component={Categories} />
            <Route path="/categories/:id/edit" exact component={EditCategory} />
            <Route
              path="/categories/create"
              exact
              component={CreateCategories}
            />

            <Route path="/stories" exact component={Stories} />
            <Route path="/stories/:id/edit" exact component={EditStories} />
            <Route path="/stories/create" exact component={CreateStories} />

            <Redirect from="/" to="/dashboard" />
          </Switch>
        </div>
      </StyleProvider>
    </div>
  );
}
