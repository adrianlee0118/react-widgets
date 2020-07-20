import React, { Fragment, useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
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
    setIsLoading(true);

    fetch(API + DEFAULT_QUERY)
      .then((response) => {
        if (response.ok) return response.json();
        else setError(new Error());
      })
      .then((data) => setHits(data.hits))
      .catch((error) => this.setError(error));

    setIsLoading(false);
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
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API + DEFAULT_QUERY)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Something went wrong...");
      })
      .then((data) => this.setState({ hits: data.hits, isLoading: false }))
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
}
*/

export default App;
