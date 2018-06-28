import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Menu from './menu';
import { arrowStyle, defaultButtonStyle, wrapperStyle, defaultButtonTextStyle } from './dropdown.style';


export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      open: false,
      selected: props.defaultValue,
    };
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  handleSelect(option) {
    if ( option !== this.state.selected) {
      this.props.onChange(option);
      this.setState({
        selected: option,
        open: false
      });
    }
  }

  handleBlur() {
    this.setState({
      open: false
    });
  }

  render() {
    const { buttonStyle, className, menuItemStyle, menuStyle, options, width } = this.props;
    const { selected, open } = this.state;

    return (
      <div
        style={ wrapperStyle }
        onBlur={ this.handleBlur }
        className={ classNames('dropdown', className) }
        tabIndex='-1'
      >
        <div
          className='test--dropdown-button'
          style={ { ...defaultButtonStyle(width), ...buttonStyle } }
          onClick={ this.handleClick }
        >
          <span style={ defaultButtonTextStyle(width - 30) }>{ selected }</span>
          <span style={ arrowStyle(open) }/>
        </div>
        {
          open ? (
            <Menu
              menuItemStyle={ menuItemStyle }
              menuStyle={ menuStyle }
              onSelect={ this.handleSelect }
              options={ options }
              width={ width }
              selected={ selected }
            />
          ) : null
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  buttonStyle: PropTypes.object,
  menuItemStyle: PropTypes.object,
  menuStyle: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
};

Dropdown.defaultProps = {
  options: [],
  onChange: () => {},
};
