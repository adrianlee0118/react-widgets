//Turning APIList-FcnComp-Axios-AsyncAwait API retrieval logic into a custom hook

import React, { useState, useEffect, Fragment, useReducer } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";

const App = () => (
  <div>
    <APISearchList />
  </div>
);

//Reducer function: a state goes in, actions in combination with old state return a new state
//In contrast to the hook without using useReducer, state variables become bundled such that impossible combinations of state can not occur
//basically, the original useState with a variable and setter for each property becomes combined into a useState for a group of properties with a single setter
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

//custom hook, url and data format generalized based on inputs
const useDataAPI = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  //data, isLoading and isError all managed by reducer:
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  }); //second argument of useReducer is the initialstate!

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();

    return () => {
      //cleanup function: prevents state from setting when umounted
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
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
