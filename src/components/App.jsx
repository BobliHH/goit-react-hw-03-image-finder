import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import axios from 'axios';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    showModal: false,
    selectedImage: null,
    isLastPage: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1, isLastPage: false }, () => {
        this.fetchImages();
      });
    }
  }
  fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '36858023-bcc8002212b119e45a3b53208';

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          return alert(
            'Sorry, there are no images matching your request...',
            {}
          );
        }

        const modifiedHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...modifiedHits],
          page: prevState.page + 1,
          isLastPage:
            prevState.images.length + modifiedHits.length >= totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query: query,
      page: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearchSubmit} />
      </div>
    );
  }
}

export default App;
