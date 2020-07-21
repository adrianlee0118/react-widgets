import React, { useEffect, Fragment, useReducer } from "react";
import ContentLoader from "react-content-loader";
import axios from "axios";
import "./App.css";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

const App = () => (
  <div>
    <APIList />
  </div>
);

const apiListReducer = (state, action) => {
  switch (action.type) {
    case "START_FETCH":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SUCCESSFUL":
      return {
        ...state,
        hits: action.result.data.hits,
        isLoading: false,
      };
    case "FETCH_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
};

const APIList = () => {
  const [state, dispatch] = useReducer(apiListReducer, {
    hits: [],
    isLoading: false,
    error: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "START_FETCH" });

      try {
        const result = await axios(API + DEFAULT_QUERY);
        dispatch({ type: "FETCH_SUCCESSFUL", result: result });
      } catch (error) {
        dispatch({ type: "FETCH_FAILED", error: error });
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      {state.error && <div>Something went wrong...</div>}
      {state.isLoading ? (
        <ContentLoader />
      ) : (
        <ul>
          {state.hits.map((item) => (
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
