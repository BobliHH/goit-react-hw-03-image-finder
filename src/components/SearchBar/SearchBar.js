import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';

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
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.search}>
          <button type="submit" className={styles.button}>
            <span className={styles.label}>Search...</span>
          </button>

          <input
            name="input"
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.input}
            autoFocus
            placeholder="Search images and photos"
            className={styles.input}
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
