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
import CustomVote from "./components/CustomVote.jsx";
import CustomPostsThumbnail from "./components/CustomPostsThumbnail.jsx";
import CustomAutoForm from "./components/CustomAutoForm.jsx";
import CustomCommentsItem from "./components/CustomCommentsItem.jsx";
//import CustomHeader from "./components/CustomHeader.jsx";
//import CustomSearchForm from "./components/CustomSearchForm.jsx";

//console.log("CustomLayout",Telescope.components.Layout)
Telescope.components.Logo = CustomLogo;
Telescope.components.Newsletter = CustomNewsletter;
Telescope.components.PostsItem = CustomPostsItem;
Telescope.components.PostsPage = CustomPostPage;
Telescope.components.Layout = CustomLayout;
Telescope.components.PostsList = CustomPostList;
Telescope.components.PostsViews = CustomPostsView;
Telescope.components.Vote = CustomVote;
Telescope.components.PostsThumbnail = CustomPostsThumbnail;
Telescope.components.CommentsItem = CustomCommentsItem;
//Telescope.components.Cus = CustomHeader;
//Telescope.components.SearchForm = CustomSearchForm;
//import CustomSlider from "./components/partials/CustomSlider";
Telescope.registerComponent("CustomSlider",require('./components/partials/CustomSlider.jsx'));
Telescope.registerComponent("CustomPostDetails",require('./components/partials/CustomPostDetails.jsx'));

