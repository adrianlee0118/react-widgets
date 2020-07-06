//Turning APIList-FcnComp-Axios-AsyncAwait API retrieval logic into a custom hook

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";

const App = () => (
  <div>
    <APISearchList />
  </div>
);

//custom hook, url and data format generalized based on inputs
const useDataAPI = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
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
  }, [url]); //re-render occurs only when url changes, which is the function passed to the class or component using the hook

  return [{ data, isLoading, isError }, setUrl]; //return a state and a function to set the variable that
};

const APISearchList = () => {
  const [query, setQuery] = useState("redux"); //value of search field
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
    "https://hn.algolia.com/api/v1/search?query=redux",
    {
      hits: [],
    }
  );

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
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
