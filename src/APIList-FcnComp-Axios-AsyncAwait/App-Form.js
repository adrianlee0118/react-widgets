//Use a form + submit button combo in contrast to a native input/button--looks the same as input/button combo but allows for query submissions by the enter key in addition to the button

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";

const App = () => (
  <div>
    <APISearchList />
  </div>
);

const APISearchList = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux"); //value of search field
  const [url, setUrl] = useState(
    //url obtained from query value in search field
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]); //re-render occurs only when url changes

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault(); //prevents submit from triggering a browser reload every time
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <ContentLoader />
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default App;
