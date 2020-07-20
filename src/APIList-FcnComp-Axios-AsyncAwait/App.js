import React, { useState, useEffect, Fragment } from "react";
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

const APIList = () => {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await axios(API + DEFAULT_QUERY);
        setHits(result.data.hits);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      {error && <div>Something went wrong...</div>}
      {isLoading ? (
        <ContentLoader />
      ) : (
        <ul>
          {hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

/*
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
}
*/

export default App;
