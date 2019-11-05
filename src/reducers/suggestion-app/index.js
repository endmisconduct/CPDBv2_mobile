import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import suggestions from './suggestions';
import isSearchFocused from './is-search-focused';
import query from './query';
import isSuccess from './is-success';
import recentSuggestions from './recent-suggestions';
import activeCategory from './active-category';
import chosenCategory from './chosen-category';


export default combineReducers({
  suggestions,
  isRequesting,
  isSearchFocused,
  query,
  isSuccess,
  recentSuggestions,
  activeCategory,
  chosenCategory,
});
