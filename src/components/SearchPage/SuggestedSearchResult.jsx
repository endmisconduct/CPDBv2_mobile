import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SuggestedSearchResult extends Component {

  renderItem(item, index) {
    const { saveToRecent } = this.props;
    const { url, type, title } = item;
    const onClick = saveToRecent.bind(this, { url, type, title });

    return (
      <Link className={ `row suggested ${type.toLowerCase()}` } to={ url } onClick={ onClick } key={ index }>
        <span className='suggested-type'>{ type }</span>
        <span className='suggested-title'>{ title }</span>
      </Link>
    );
  }

  render() {
    const { items } = this.props;
    const links = items.map((item, index) => this.renderItem(item, index));
    return <div>{ links }</div>;
  }
}

SuggestedSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  index: PropTypes.number
};

export default SuggestedSearchResult;
