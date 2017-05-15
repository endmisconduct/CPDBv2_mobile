import { combineReducers } from 'redux';

import suggestionApp from './suggestionApp';
import officerPage from './officerPage';
import landingPage from './landingPage';
import reportingPage from './reportingPage';
import faqPage from './faqPage';
import complaintPage from './complaintPage';


export default combineReducers({
  suggestionApp,
  officerPage,
  landingPage,
  reportingPage,
  faqPage,
  complaintPage
});
