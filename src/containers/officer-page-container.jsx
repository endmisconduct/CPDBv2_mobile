import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { isNaN } from 'lodash';

import OfficerPage from 'components/officer-page';
import { fetchOfficer, requestCMS, changeOfficerTab } from 'actions/officer-page';
import {
  officerSummarySelector,
  officerMetricsSelector,
  officerYearlyPercentileSelector,
  getCurrentTab,
} from 'selectors/officer-page';
import { cmsSelector, hasCMS } from 'selectors/common/cms';
import { hasCoaccusalSelector, isCoaccusalSuccess } from 'selectors/officer-page/coaccusals';
import { isTimelineSuccess } from 'selectors/officer-page/timeline';
import { getOfficerTimeline } from 'actions/officer-page/timeline';
import { getOfficerCoaccusals } from 'actions/officer-page/coaccusals';


function mapStateToProps(state, ownProps) {
  const parsedId = Number.parseInt(ownProps.params.id);
  const pk = isNaN(parsedId) ? null : parsedId;

  const props = {
    ...ownProps,
    params: {
      ...ownProps.params,
      id: pk
    }
  };
  return {
    location: ownProps.location,
    params: ownProps.params,
    loading: state.officerPage.officers.isRequesting,
    found: state.officerPage.officers.isSuccess,
    summary: officerSummarySelector(state, props),
    metrics: officerMetricsSelector(state, props),
    threeCornerPercentile: officerYearlyPercentileSelector(state, props),
    requestOfficerId: pk,
    hasCMS: hasCMS(state, 'officerPage'),
    noDataCMSContent: cmsSelector(state, 'officerPage', 'no_data_explain_text'),
    hasCoaccusal: hasCoaccusalSelector(state, pk),
    currentTab: getCurrentTab(state),
    isCoaccusalSuccess: isCoaccusalSuccess(state, pk),
    isTimelineSuccess: isTimelineSuccess(state, pk),
  };
}

const mapDispatchToProps = {
  requestCMS,
  fetchOfficer,
  changeOfficerTab,
  getOfficerTimeline,
  getOfficerCoaccusals
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerPage));
