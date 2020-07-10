import React from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";
import "./App.css";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

//Generic data fetching class that renders some children passed as a render function to its props
class Fetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(this.props.url)
      .then((result) =>
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        })
      )
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }
  render() {
    return this.props.children(this.state); //this is the execution of a function, rather than rendering components
  }
}

//The implementation of component rendering with the Fetcher class as the backend logic
//A function is passed as a children prop to the Fetcher and renders stuff conditionally
const FetcherRP = () => (
  <Fetcher url={API + DEFAULT_QUERY}>
    {({ hits, isLoading, error }) => {
      if (!hits) {
        return <p>No data yet...</p>;
      }
      if (error) {
        return <p>{error.message}</p>;
      }
      if (isLoading) {
        return <ContentLoader />;
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
    }}
  </Fetcher>
);

//Display the combined Fetcher backend and render prop front end component
const App = () => (
  <div>
    <FetcherRP />
  </div>
);

/* Logic of this class replaced with RP components above to allow for separation of the children rendering logic while maintaining flexibility of composition
class APIList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(API + DEFAULT_QUERY)
      .then((result) =>
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
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
