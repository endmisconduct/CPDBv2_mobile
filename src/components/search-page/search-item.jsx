import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { noop } from 'lodash';

import ItemPinButton from 'components/common/item-pin-button';
import style from './search-item.sass';
import * as tracking from 'utils/tracking';
import { APP_CONFIG_KEYS } from 'constants';
import appConfig from 'utils/app-config';


export default class SearchItem extends Component {
  state = {
    displayIntroduction: false,
  };

  componentDidMount() {
    if (this.shouldShowIntroduction()) {
      this.displayIntroductionTimeout = setTimeout (() => {
        this.setState({ displayIntroduction: true });
        this.displayIntroductionTimeout = null;
      }, appConfig.get(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY));
    }
  }

  componentWillUnmount() {
    this.displayIntroductionTimeout && clearTimeout(this.displayIntroductionTimeout);
  }

  handleClick = (e) => {
    const { id, type, recentItemData, saveToRecent, query, itemRank, visitPinButtonIntroduction } = this.props;
    const { displayIntroduction } = this.state;

    if (this.shouldShowIntroduction() && displayIntroduction) {
      e.preventDefault();
      visitPinButtonIntroduction();
    }

    tracking.trackSearchFocusedItem(type, query, id, itemRank);
    saveToRecent({
      type: type,
      id: id,
      data: recentItemData,
    });
  };

  shouldShowIntroduction() {
    const { showIntroduction, isPinButtonIntroductionVisited } = this.props;
    return showIntroduction && !isPinButtonIntroductionVisited;
  }

  render() {
    const {
      url, hasPinButton, addOrRemoveItemInPinboard,
      id, isPinned, type, className, children, extraInfo,
      visitPinButtonIntroduction,
      isPinButtonIntroductionVisited,
    } = this.props;
    const { displayIntroduction } = this.state;
    const showIntroduction = this.shouldShowIntroduction() && displayIntroduction;

    return (
      <Link
        to={ url }
        className={ cx(style.wrapper, className) }
        onClick={ this.handleClick }>
        {
          hasPinButton &&
          <ItemPinButton
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            visitPinButtonIntroduction={ visitPinButtonIntroduction }
            isPinButtonIntroductionVisited={ isPinButtonIntroductionVisited }
            showIntroduction={ showIntroduction }
            id={ id }
            isPinned={ isPinned }
            type={ type }
            item={ {
              type: type,
              id: id,
              isPinned: isPinned,
              ...extraInfo,
            } }
            className='item-pin-button'
          />
        }
        { children }
        { showIntroduction &&
          <div className='pin-button-introduction'>Tap this button to add to your pinboard</div> }
        <span className='item-indicator' />
      </Link>
    );
  }
}

SearchItem.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  hasPinButton: PropTypes.bool,
  addOrRemoveItemInPinboard: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isPinned: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node,
  saveToRecent: PropTypes.func,
  recentItemData: PropTypes.object,
  query: PropTypes.string,
  itemRank: PropTypes.number,
  extraInfo: PropTypes.object,
  showIntroduction: PropTypes.bool,
  visitPinButtonIntroduction: PropTypes.func,
  isPinButtonIntroductionVisited: PropTypes.bool,
};

SearchItem.defaultProps = {
  className: '',
  saveToRecent: noop,
  visitPinButtonIntroduction: noop,
};
