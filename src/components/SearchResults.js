import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { UPDATE_SEARCH_QUERY,
         SEARCH,
         SEARCH_PAGE_UNLOADED } from '../constants/actionTypes';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';

const mapStateToProps = (state) => ({
  ...state.search,
})

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: SEARCH_PAGE_UNLOADED}),
  onSubmit: (query) =>
    dispatch({ type: SEARCH, payload: agent.Search.search(query), query}),
});

class SearchResults extends React.Component {

  componentWillMount() {
    let queryStr = this.props.location.search.substr(3);
    if (queryStr.length > 0 && !this.props.hits) {
      this.props.onSubmit(queryStr);
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    let props = this.props;
    if (props.inProgress) {
      return (
        <div className="container page">
          <div className="row">
            <div className="col-md-12">
              <div className="article-preview">Loading...</div>
            </div>
          </div>
        </div>
      );
    }

    if (props.hits && props.hits.length === 0) {
      return (
        <div className="container page">
          <div className="row">
            <div className="col-md-12">
              <div className="article-preview">
                We couldn’t find any articles
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="container page">
        <div className="row">
          <div className="col-md-12">
            <div>
              { props.hits &&
                props.hits.map(hit => {
                  return <ArticlePreview article={hit} key={hit.slug} />

                })
              }

              <ListPagination
                pager={props.pager}
                articlesCount={props.hitsCount}
                currentPage={props.currentPage}
                searchQuery={props.query}
                />

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
