import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  search = event => {
    event.preventDefault();
    this.setState({ input: event.target.value });
  };

  handleChange = event => {
    event.preventDefault();
    if (!this.state.query.trim()) {
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.search}>
          <button type="submit" className="button">
            <span className="lable">Search...</span>
          </button>

          <input
            name="input"
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.input}
            autoFocus
            placeholder="Search images and photos"
            className="input"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
