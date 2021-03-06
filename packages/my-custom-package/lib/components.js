/*
This file centralizes all our custom component overrides. 
*/
import Telescope from 'meteor/nova:lib';

Telescope.registerComponent("CustomSlider",require('./components/partials/CustomSlider.jsx'));
Telescope.registerComponent("CustomPostDetails",require('./components/partials/CustomPostDetails.jsx'));

//Telescope.registerComponent("MobilePostsList",require('./components/mobile/MobilePostsList.jsx'));
Telescope.registerComponent("MobilePostsItem",require('./components/mobile/MobilePostsItem.jsx'));
Telescope.registerComponent("MobileHome",require('./components/MobileHome.jsx'));
Telescope.registerComponent("MobileDateLikeBtn",require('./components/mobile/MobileDateLikeBtn.jsx'));
Telescope.registerComponent("MobileCategoriesMenu",require('./components/mobile/MobileCategoriesMenu.jsx'));

Telescope.registerComponent("MobilePostDetails",require('./components/mobile/MobilePostDetails.jsx'));
Telescope.registerComponent("MobileSearchComponent",require('./components/mobile/MobileSearchComponent.jsx'));



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
import MobilePostsItem from "./components/mobile/MobilePostsItem.jsx"
import MobilePostsList from "./components/mobile/MobilePostsList.jsx";
import MobileHome from "./components/MobileHome.jsx";
import MobileDateLikeBtn from "./components/mobile/MobileDateLikeBtn.jsx";
import MobileCategoriesMenu from "./components/mobile/MobileCategoriesMenu.jsx";
import MobilePostDetails from "./components/mobile/MobilePostDetails.jsx";
import MobileSearchPage from "./components/mobile/MobileSearchPage.jsx";

import MobileSearchComponent from "./components/mobile/MobileSearchComponent.jsx";
import MobileShowTimingBtn  from "./components/mobile/MobileShowTimingBtn.jsx";
import MobileVariousDatesBtn  from "./components/mobile/MobileVariousDatesBtn.jsx";
import MobileDateVenueList from "./components/mobile/MobileDateVenueList.jsx"; 


import CustomHeader from "./components/CustomHeader.jsx";
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
Telescope.components.MobilePostsItem = MobilePostsItem;
Telescope.components.MobilePostsList = MobilePostsList;
Telescope.components.MobileHome = MobileHome;
Telescope.components.MobileDateLikeBtn = MobileDateLikeBtn;
Telescope.components.MobileCategoriesMenu = MobileCategoriesMenu;
Telescope.components.MobilePostDetails = MobilePostDetails;
Telescope.components.MobileSearchPage = MobileSearchPage;
Telescope.components.MobileSearchComponent = MobileSearchComponent;
Telescope.components.Header = CustomHeader;
Telescope.components.MobileShowTimingBtn = MobileShowTimingBtn;
Telescope.components.MobileVariousDatesBtn = MobileVariousDatesBtn;
Telescope.components.MobileDateVenueList = MobileDateVenueList;

//Telescope.components.Cus = CustomHeader;
//Telescope.components.SearchForm = CustomSearchForm;
//import CustomSlider from "./components/partials/CustomSlider";
