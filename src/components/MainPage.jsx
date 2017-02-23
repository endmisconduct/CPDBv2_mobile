import React, {
  Component,
  PropTypes
} from 'react';
import cx from 'classnames';
import style from 'styles/MainPage.sass';

import MainPageContentContainer from 'containers/MainPage/MainPageContentContainer';
import BottomSheetContainer from 'containers/BottomSheetContainer';


class MainPage extends Component {
  componentDidMount() {
    const { suggestTerm, urlQuery } = this.props;
    const sanitizedQuery = urlQuery.replace(/\+|\-|\_/g, ' ');

    if (sanitizedQuery) {
      suggestTerm({ query: sanitizedQuery });
    }
  }

  render() {
    const { isSearchFocused, query, children } = this.props;

    return (
      <div className={ cx('content', style.mainPage, { gray: isSearchFocused }) }>
        <MainPageContentContainer topLeft={ isSearchFocused } query={ query } />
        <BottomSheetContainer>
          {
            children && React.cloneElement(children, {
              key: location.pathname
            })
          }
        </BottomSheetContainer>
        <div className='bottom-padding'></div>
      </div>
    );
  }
}

MainPage.propTypes = {
  suggestTerm: PropTypes.func.isRequired,
  query: PropTypes.string,
  urlQuery: PropTypes.string,
  children: PropTypes.object,
  isSearchFocused: PropTypes.number
};

MainPage.defaultProps = {
  isSearchFocused: false,
  query: '',
  urlQuery: ''
};

export default MainPage;
