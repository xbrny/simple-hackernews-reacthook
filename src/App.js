import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const App = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('React hook');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchRef = useRef();

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setNews(result.data.hits);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    getResult();
  };

  const handleClearSearch = event => {
    setQuery('');
    searchRef.current.focus();
  };

  return (
    <div
      className='container'
      style={{
        backgroundColor: 'rgba(155,77,202, 0.04)',
        padding: '1rem 3rem',
        boxShadow: '0px 0px 7px rgba(155,77,202, 0.3)'
      }}
    >
      <div style={{ textAlign: 'center', marginTop: 50, marginBottom: 30 }}>
        <img
          src='https://icon.now.sh/react/80/9b4dca'
          alt='React logo'
          style={{ marginBottom: 8 }}
        />
        <h3>Hacker news API with React Hook</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchRef}
        />
        <button type='submit' className='button' style={{ marginRight: 10 }}>
          Search
        </button>
        <button
          type='button'
          className='button button-outline'
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {!isLoading &&
            news.map(story => (
              <li key={story.objectID}>
                <a target='_blank' rel='noopener noreferrer' href={story.url}>
                  {story.title || story.story_title}
                </a>
              </li>
            ))}
        </ul>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default App;
