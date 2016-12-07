/*
This file centralizes all our custom component overrides. 
*/

import Telescope from 'meteor/nova:lib';

import CustomLogo from "./components/CustomLogo.jsx";
import CustomNewsletter from "./components/CustomNewsletter.jsx";
import CustomPostsItem from "./components/CustomPostsItem.jsx";
import CustomPostPage from "./components/CustomPostPage.jsx";
import CustomLayout from "./components/CustomLayout.jsx";
import CustomPostList from "./components/CustomPostList.jsx";
import CustomPostsView from "./components/CustomPostsView.jsx";

//console.log("CustomLayout",Telescope.components.Layout)
Telescope.components.Logo = CustomLogo;
Telescope.components.Newsletter = CustomNewsletter;
Telescope.components.PostsItem = CustomPostsItem;
Telescope.components.PostsPage = CustomPostPage;
Telescope.components.Layout = CustomLayout;
Telescope.components.PostsList = CustomPostList;
Telescope.components.PostsViews = CustomPostsView;
