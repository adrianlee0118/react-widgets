import React from "react";
import axios from "axios";
import "./App.css";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

//Standard higher order function for components extracting data from a url
//also adds state which is destructured inside the APIList component for access
const withFetching = (url, query) => (Component) =>
  class withFetching extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hits: null,
        isLoading: false,
        error: null,
      };
    }
    async componentDidMount() {
      this.setState({ isLoading: true });
      try {
        const result = await axios.get(url + query);
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false,
        });
      }
    }
    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

//Base component
const APIList = ({ hits, isLoading, error }) => {
  if (!hits) {
    return <p>No data yet ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <ul>
      {hits.map((hit) => (
        <li key={hit.objectID}>
          <a href={hit.url}>{hit.title}</a>
        </li>
      ))}
    </ul>
  );
};

//Wrapping base component and rendering
const APIListWithFetch = withFetching(API, DEFAULT_QUERY)(APIList);
const App = () => (
  <div>
    <APIListWithFetch />
  </div>
);

/*  replaced by combination of base class and HOC for data fetching
class APIList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(API + DEFAULT_QUERY);
      this.setState({
        hits: result.data.hits,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }
  render() {
    const { hits, isLoading } = this.state;
    if (error) return <p>{error.message}</p>;
    if (isLoading) return <ContentLoader />;
    return (
      <ul>
        {hits.map((hit) => (
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ul>
    );
  }
}*/

export default App;
