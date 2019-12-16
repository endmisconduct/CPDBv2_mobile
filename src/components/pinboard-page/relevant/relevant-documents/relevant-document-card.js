import React, { PropTypes, Component } from 'react';

import styles from './relevant-document-card.sass';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import withUndoCard from 'components/pinboard-page/cards/with-undo-card';
import constants from 'constants';


export default class RelevantDocumentCard extends Component {
  render() {
    const {
      allegation,
      url,
      previewImageUrl,
      addItemInPinboardPage,
      pinned,
    } = this.props;

    const leftChild = (
      <a
        className={ styles.documentCardThumbnail }
        href={ url }
        target='_blank'
      >
        <img className='document-card-thumbnail-img' src={ previewImageUrl }/>
      </a>
    );

    return (
      <BaseComplaintCard
        { ...allegation }
        leftChild={ leftChild }
        addItemInPinboardPage={ pinned ? null : addItemInPinboardPage }
        pinned={ pinned }
        fadePlusButtonOnly={ true }
      />
    );
  }
}

RelevantDocumentCard.propTypes = {
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  allegation: PropTypes.object,
  addItemInPinboardPage: PropTypes.func,
  pinned: PropTypes.bool,
};

export const RelevantDocumentCardWithUndo = withUndoCard(
  RelevantDocumentCard,
  () => 'Document added.',
  'addItemInPinboardPage',
  {
    theme: constants.PINBOARD_PAGE.UNDO_CARD_THEMES.DARK,
    keepVisible: true,
    hasWrapper: true,
  },
);

