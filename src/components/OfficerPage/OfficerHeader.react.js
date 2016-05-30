import React from 'react';
import OfficerPresenter from 'presenters/OfficerPresenter';


const OfficerHeader = React.createClass({
  propTypes: {
    officer: React.PropTypes.object
  },

  render() {
    const officerPresenter = OfficerPresenter(this.props.officer);

    return (
      <div className='officer-header'>
        <div className='pad'>
          <div className='badge-info'>
            <span className='badge-label'>Badge &nbsp;</span>
            <span className='badge-value'>{ officerPresenter.badge }</span>
          </div>
          <div className='name'>{ officerPresenter.displayName }</div>
        </div>
      </div>
    );
  }
});

export default OfficerHeader;
