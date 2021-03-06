/*
A new custom route for our custom page. 
Browse to http://localhost:3000/my-custom-route to see it.
*/

import Telescope from 'meteor/nova:lib';
import MyCustomPage from './components/MyCustomPage.jsx';

//Telescope.routes.add({name:"myCustomRoute", path:"/my-custom-route", component:MyCustomPage});
Telescope.routes.add({name:"categoriesMenu", path:"/categoriesMenu", component:Telescope.components.MobileCategoriesMenu});
Telescope.routes.add({name:"MobilePostDetails", path:"/PostDetails/:id", component:Telescope.components.MobilePostDetails});
Telescope.routes.add({name:"MobileSearchPage", path:"/SearchPage", component:Telescope.components.MobileSearchPage});

