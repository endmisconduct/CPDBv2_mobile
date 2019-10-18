import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { every, isEmpty } from 'lodash';

import withPinnable from 'components/common/with-pinnable';
import styles from 'components/common/item-pin-button.sass';


class ItemPinButton extends Component {
  render() {
    const { className, item, items } = this.props;
    const isPinned = every(isEmpty(items) ? [item] : items, item => item.isPinned);

    return (
      <div className={ cx(styles.itemPinButton, { 'is-pinned': isPinned }, className) }/>
    );
  }
}

ItemPinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  })),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
  showHint: PropTypes.bool,
};

ItemPinButton.defaultProps = {
  showHint: true,
  items: [],
};

export default withPinnable(ItemPinButton);
