import React from 'react';
import { FormattedMessage } from 'react-intl';

const AppLoading = () => {
  return (
    // <p><FormattedMessage id="app.loading"/></p>
    <div className="loading">
      <img className="loader-image" src="/loader.gif" />
      <p className="loader-text"><FormattedMessage id="app.loading"/></p>
    </div>
  )
};

AppLoading.displayName = "AppLoading";

module.exports = AppLoading;
export default AppLoading;
