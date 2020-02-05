import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import cx from 'classnames';

import styles from './menu.sass';


export default class Menu extends Component {
  render() {
    const { options, onSelect, selectedIndex } = this.props;
    const labels = get(this.props, 'labels', this.props.options);
    return (
      <div className={ cx(styles.dropdownMenu, 'test--dropdown-menu') }>
        {
          options.map((option, index) => (
            option !== options[selectedIndex] ? (
              <div
                key={ index }
                className='dropdown-menu-item'
                onClick={ () => onSelect(index) }
              >
                { labels[index] }
              </div>
            ) : null
          ))
        }
      </div>
    );
  }
}

Menu.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array,
  selectedIndex: PropTypes.number,
  labels: PropTypes.array,
};

Menu.defaultProps = {
  options: [],
};
