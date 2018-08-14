import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { UPDATE_SEARCH_QUERY,
         SEARCH,
         SEARCH_PAGE_UNLOADED } from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.search });

const mapDispatchToProps = dispatch => ({
  onChangeSearchQuery: value =>
    dispatch({ type: UPDATE_SEARCH_QUERY, key: 'query', value}),
  onSubmit: (query) =>
    dispatch({ type: SEARCH, payload: agent.Search.search(query), query}),
  
});

class SearchBox extends React.Component {
  constructor() {
    super();
    this.changeSearchQuery = ev => this.props.onChangeSearchQuery(ev.target.value);
    this.submitForm = (query) => ev => {
      ev.preventDefault();
      this.props.onSubmit(query);

    };
  }

  render() {
    const query = this.props.query ? this.props.query : "";

    return (
      <form onSubmit={this.submitForm(query)}>
        <input
          placeholder="Search ..."
          required="true"
          type="text"
          value={query}
          onChange={this.changeSearchQuery} />
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
