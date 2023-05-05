import { useState, useEffect, useCallback } from 'react';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Searchbar } from './searchbar/Searchbar';
import { getImages, PER_PAGE } from '../network/api';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import css from './App.module.css';

export function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const handleSearch = useCallback(value => {
    setPage(1);
    setSearchValue(value);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!searchValue) {
        setHits([]);
        setTotalHits(0);
        return;
      }

      try {
        setLoading(true);
        const images = await getImages({
          page,
          searchValue,
        });

        if (searchValue === searchValue) {
          setHits(prevHits => [...prevHits, ...images.hits]);
        } else {
          setHits(images.hits);
          setTotalHits(images.totalHits);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, searchValue]);

  const hasMoreImages = totalHits > 0 && page * PER_PAGE < totalHits;

  return (
    <div className={css.AppContainer}>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery hits={hits} />

      {loading && <Loader />}

      {hasMoreImages && !loading && <Button onLoadMore={handleLoadMore} />}
    </div>
  );
}
