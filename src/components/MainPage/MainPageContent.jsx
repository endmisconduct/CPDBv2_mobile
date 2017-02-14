import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';
import Header from 'components/MainPage/MainPageContent/Header';
import Footer from 'components/MainPage/MainPageContent/Footer';
import style from 'styles/MainPage/MainPageContent.sass';


export default class MainPageContent extends Component {

  componentWillMount() {
    this.props.requestLandingPage();
  }

  render() {
    const { topLeft, query, reportSection, children } = this.props;
    const searchBarWrapperClassNames = cx('search-wrapper animation', { 'top-left': topLeft });
    const headerClassNames = cx(style.mainPageContent, { 'top-left': topLeft });

    const searchDescriptionClassNames = cx('search-description', { 'hidden': !!query });
    const landingPageHeight = document.documentElement.clientHeight;

    return (
      <div className={ headerClassNames }>
        <div className='full-height-wrapper' style={ { height: landingPageHeight } }>
          <Header topLeft={ topLeft } />
          <div className='wrapper animation'>
            <div className='holder'>
              <div className={ searchBarWrapperClassNames }>
                <SearchBarContainer />
              </div>
            </div>
            <div
              className={ searchDescriptionClassNames }>Type the name of a police officer, badge number, or CRID number.
            </div>
            <Footer isSearchFocused={ topLeft } reportSection={ reportSection } />
          </div>

        </div>

        <SearchResultsContainer />

        { children }

      </div>
    );
  }
}

MainPageContent.defaultProps = {
  requestLandingPage: () => {}
};

MainPageContent.propTypes = {
  topLeft: PropTypes.number,
  query: PropTypes.string,
  aboutSection: PropTypes.object,
  collaborateSection: PropTypes.object,
  requestLandingPage: PropTypes.func,
  faqSection: PropTypes.object,
  reportSection: PropTypes.object,
  children: PropTypes.array
};
