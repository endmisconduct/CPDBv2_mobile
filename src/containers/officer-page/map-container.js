import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AllegationsMap from 'components/common/allegations-map';
import { mapLegendSelector, mapMarkerGroupsSelector } from 'selectors/officer-page/map';

function mapStateToProps(state, ownProps) {
  return {
    legend: mapLegendSelector(state, ownProps.officerId),
    markerGroups: mapMarkerGroupsSelector(state, ownProps.officerId),
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMap));
