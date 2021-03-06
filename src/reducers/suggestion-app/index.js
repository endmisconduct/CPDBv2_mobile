import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import suggestions from './suggestions';
import isSearchFocused from './is-search-focused';
import query from './query';
import isSuccess from './is-success';
import recentSuggestions from './recent-suggestions';
import activeCategory from './active-category';
import chosenCategory from './chosen-category';
import recentSuggestionsRequested from './recent-suggestions-requested';
import pagination from './pagination';
import cancelPathname from 'reducers/suggestion-app/cancel-pathname';


export default combineReducers({
  suggestions,
  isRequesting,
  isSearchFocused,
  query,
  isSuccess,
  recentSuggestions,
  activeCategory,
  chosenCategory,
  recentSuggestionsRequested,
  pagination,
  cancelPathname,
});
