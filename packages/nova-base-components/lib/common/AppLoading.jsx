import React from 'react';
import Telescope from 'meteor/nova:lib';
import { FormattedMessage } from 'react-intl';

const AppLoading = () => {
  return (
 	  <div className="appLoadingComp"><div className="posts-load-more-loading"><Telescope.components.Loading /></div></div>
  )
};

AppLoading.displayName = "AppLoading";

module.exports = AppLoading;
export default AppLoading;
  // <p><FormattedMessage id="app.loading"/></p>

   // <div className="loading">
     // <img className="loader-image" src="/loader.gif" />
     // <p className="loader-text"><FormattedMessage id="app.loading"/></p>
    //</div>