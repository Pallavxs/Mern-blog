import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetail, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser, RouteUserblog } from "./helpers/RouterName";
import Profile from "./pages/Profile";
import EditCategory from "./pages/Categories/EditCategory";
import CategoryDetails from "./pages/Categories/CategoryDetails";
import AddCategory from "./pages/Categories/AddCategory";
import BlogDetails from "./pages/Blog/BlogDetails";
import Addblog from "./pages/Blog/AddBlog";
import EditBlog from "./pages/Blog/EditBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import User from "./pages/User";
import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";
import Userblog from "./pages/Userblog";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails/>} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory/>} />
          <Route path={RouteSearch()} element={<SearchResult/>} />

          <Route element={<AuthRouteProtection/>} >
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<Addblog/>} />
            <Route path={RouteBlog} element={<BlogDetails/>} />
            <Route path={RouteBlogEdit()} element={<EditBlog/>} />
            <Route path={RouteCommentDetail} element={<Comments/>} />
            <Route path={RouteUserblog} element={<Userblog/>} />
          </Route>

          <Route element={<OnlyAdminAllowed/>}>
            <Route path={RouteAddCategory} element={<AddCategory/>} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails/>} />
            <Route path={RouteEditCategory()} element={<EditCategory/>} />
            <Route path={RouteUser} element={<User/>} />
          </Route>

        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
