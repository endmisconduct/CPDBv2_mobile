import { get, isEmpty, isUndefined, sum } from 'lodash';
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

const getItems = (state, officerId) => state.officerPage.timeline.data[officerId] || [];

const attachedComplaint = item => !isEmpty(get(item, 'attachments'));

export const complaintsWithAttachmentsSelector = createSelector(
  getItems,
  items => items.filter(attachedComplaint).map(attachmentsComplaintTransform)
);

export const hasAttachmentSelector = createSelector(
  getItems,
  items => !isUndefined(items.find(attachedComplaint))
);

export const numAttachmentsSelector = createSelector(
  getItems,
  items => sum(items.map(item => (item.attachments || []).length))
);
