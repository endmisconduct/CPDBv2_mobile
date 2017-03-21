import { createSelector } from 'reselect';
import moment from 'moment';
import constants from 'constants';

const getOfficerSummary = (state, props) => (
  state.officerPage.summaries.data[props.params.id] || null
);

export const officerSummarySelector = createSelector(
  [getOfficerSummary],
  (summary) => {
    if (!summary) {
      return null;
    }

    const doa = summary.date_of_appt;
    let dateOfAppt = null;
    let yearsSince = null;
    if (doa) {
      dateOfAppt = moment(doa).format(constants.SIMPLE_DATE_FORMAT).toUpperCase();
      yearsSince = `${moment().diff(doa, 'years')} years`;
    }

    const complaints = summary.complaint_records;
    const facetNameMappings = {
      'category': 'Category',
      'race': 'Complainant Race',
      'gender': 'Complainant Gender',
      'age': 'Complainant Age'
    };
    const transformFacet = (facet) => {
      return {
        name: facetNameMappings[facet.name],
        entries: facet.entries
      };
    };

    return {
      name: summary.full_name,
      unit: summary.unit,
      rank: summary.rank,
      badge: summary.badge,
      dateOfAppt: dateOfAppt,
      yearsSinceDateOfAppt: yearsSince,
      race: summary.race,
      sex: summary.gender,
      complaints: {
        count: complaints.count,
        facets: complaints.facets.map(transformFacet)
      }
    };
  }
);

const getOfficerTimeline = (state, props) => (
  state.officerPage.timelines.data[props.params.id] || null
);

export const officerTimelineSelector = createSelector(
  [getOfficerTimeline],
  (timeline) => timeline
);