import { get, isEmpty } from 'lodash';
import moment from 'moment/moment';
import { createSelector } from 'reselect';

import { attachmentsTransform } from 'selectors/officer-page/timeline';


export const attachmentsComplaintTransform = item => ({
  date: moment(item.date).format('MMM D, YYYY').toUpperCase(),
  category: item.category,
  crid: item.crid,
  coaccused: item.coaccused,
  finding: item.finding,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

const getItems = (state, props) => state.officerPage.timeline.data[props.params.id] || [];

const attachedComplaint = item => !isEmpty(get(item, 'attachments'));

export const complaintsWithAttachmentsSelector = createSelector(
  getItems,
  items => items.filter(attachedComplaint).map(attachmentsComplaintTransform)
);
