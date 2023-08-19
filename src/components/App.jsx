import { useState, useRef } from 'react';
import { searchImages } from './requests';

export default function App() {
  // ne trebuie un state in care sa tinem array-ul de imagini
  const [images, setImages] = useState([]);
  // folosim ref ca sa putem vedea valoarea din input
  // cand dam "submit" la form
  const inputRef = useRef();
  // functia care se apeleaza la "submit" form
  const handleSearch = e => {
    // nu lasam cursul normal al formularelor
    e.preventDefault();
    // ne uitam la valoarea inputului
    const currentValue = inputRef.current.value;
    if (currentValue) {
      // daca inputul are valoare
      // apelam api-ul si setam imaginile
      searchImages(currentValue).then(res => {
        console.log(res.hits);
        setImages(res.hits);
      });
    } else {
      // daca inputul e gol
      // setam ca gol arrayul de imagini
      setImages([]);
    }
  };
  return (
    <div className="App">
      <div className="Searchbar">
        <form className="SearchForm" onSubmit={handleSearch}>
          <button className="SearchForm-button" type="submit">
            Search
          </button>
          <input
            className="SearchForm-input"
            ref={inputRef}
            type="text"
            name="search"
          />
        </form>
      </div>
      <div className="ImageGallery">
        {images.length > 0 &&
          images.map(img => {
            return (
              <div className="ImageGalleryItem" key={img.id}>
                <img
                  className="ImageGalleryItem-image"
                  src={img.previewURL}
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
