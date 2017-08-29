import React, { Component, PropTypes } from 'react';
import SimpleList from 'components/Shared/SimpleList';
import constants from 'constants';


class FaqSearchResult extends Component {
  render() {
    const { faqs, saveToRecent } = this.props;

    const rows = faqs.map((faq) => {
      const url = `${constants.FAQ_PATH}${faq.id}/`;

      return {
        label: faq.question,
        url: url,
        onClick: saveToRecent.bind(undefined, {
          type: 'FAQ',
          title: faq.question,
          url: url
        })
      };
    });

    return <SimpleList rows={ rows } />;
  }
}

FaqSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  faqs: PropTypes.array
};

export default FaqSearchResult;
