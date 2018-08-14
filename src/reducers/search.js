import { updateItemInArray, updateObject } from '../utils';
import {
  UPDATE_SEARCH_QUERY,
  SEARCH,
  SEARCH_PAGE_UNLOADED,
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  ASYNC_START
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        hits: action.payload.hits,
        hitsCount: action.payload.hitsCount,
        query: action.query,
        inProgress: false,
        currentPage: 0,
        errors: action.error ? action.payload.errors : null
      };
    case SET_PAGE:
      return {
        ...state,
        hits: action.payload.hits,
        hitsCount: action.payload.hitsCount,
        currentPage: action.page
      };
    case UPDATE_SEARCH_QUERY:
      return { ...state, [action.key]: action.value };
    case SEARCH_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === SEARCH) {
        return { ...state, inProgress: true };
      }
      break;
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      const newHits = updateItemInArray(
        state.hits,
        action.payload.article.slug,
        article => {
          return updateObject(article, {
            favorited: action.payload.article.favorited,
            favoritesCount: action.payload.article.favoritesCount
          })
        });

      return updateObject(state, {hits: newHits})
    default:
      return state;
  }

  return state;
};
