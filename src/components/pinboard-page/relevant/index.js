import React, { Component, PropTypes } from 'react';
import { isEmpty, every } from 'lodash';

import styles from './relevant-section.sass';
import RelevantDocuments from 'components/pinboard-page/relevant/relevant-documents';
import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import RelevantComplaints from 'components/pinboard-page/relevant/relevant-complaints';


export default function RelevantSection(props) {
  const {
    pinboardId,
    documents,
    coaccusals,
    complaints,
    documentHasMore,
    coaccusalHasMore,
    complaintHasMore,
    documentNextParams,
    coaccusalNextParams,
    complaintNextParams,
    fetchPinboardRelevantDocuments,
    fetchPinboardRelevantCoaccusals,
    fetchPinboardRelevantComplaints,
    addItemInPinboardPage,
    isRequestingDocuments,
    isRequestingCoaccusals,
    isRequestingComplaints,
  } = props;

  if (
    every([!isRequestingDocuments, !isRequestingCoaccusals, !isRequestingComplaints]) &&
    every([documents, coaccusals, complaints].map(isEmpty))
  )
    return null;


  return (
    <div className={ styles.relevantSection }>
      <div className='relevant-title'>Relevant</div>
      <RelevantDocuments
        pinboardId={ pinboardId }
        documents={ documents }
        nextParams={ documentNextParams }
        hasMore={ documentHasMore }
        fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
        addItemInPinboardPage={ addItemInPinboardPage }
        requesting={ isRequestingDocuments }
      />
      <RelevantCoaccusals
        pinboardId={ pinboardId }
        coaccusals={ coaccusals }
        nextParams={ coaccusalNextParams }
        hasMore={ coaccusalHasMore }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
        addItemInPinboardPage={ addItemInPinboardPage }
        requesting={ isRequestingCoaccusals }
      />
      <RelevantComplaints
        pinboardId={ pinboardId }
        complaints={ complaints }
        nextParams={ complaintNextParams }
        hasMore={ complaintHasMore }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
        addItemInPinboardPage={ addItemInPinboardPage }
        requesting={ isRequestingComplaints }
      />
    </div>
  );
}

RelevantSection.propTypes = {
  pinboardId: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.object),
  coaccusals: PropTypes.arrayOf(PropTypes.object),
  complaints: PropTypes.arrayOf(PropTypes.object),
  documentHasMore: PropTypes.bool,
  coaccusalHasMore: PropTypes.bool,
  complaintHasMore: PropTypes.bool,
  documentNextParams: PropTypes.object,
  coaccusalNextParams: PropTypes.object,
  complaintNextParams: PropTypes.object,
  fetchPinboardRelevantDocuments: PropTypes.func,
  fetchPinboardRelevantCoaccusals: PropTypes.func,
  fetchPinboardRelevantComplaints: PropTypes.func,
  addItemInPinboardPage: PropTypes.func,
  isRequestingDocuments: PropTypes.bool,
  isRequestingCoaccusals: PropTypes.bool,
  isRequestingComplaints: PropTypes.bool,
};

RelevantSection.defaultProps = {
  fetchPinboardRelevantDocuments: () => {},
  fetchPinboardRelevantCoaccusals: () => {},
  fetchPinboardRelevantComplaints: () => {},
};

