import React from "react";
import "./App.css";

const App = () => (
  <div>
    <SearchableList />
  </div>
);

const Search = ({ query, onChange, children }) => (
  <div>
    {children} <input type="text" value={query} onChange={onChange} />
  </div>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

class SearchableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({
      query: value,
    });
  }

  render() {
    const { list } = this.props;
    const { query } = this.state;

    return (
      <div>
        <Search query={query} onChange={this.onChange}>
          Search List:
        </Search>
        <List list={(list || []).filter(byQuery(query))} />
      </div>
    );
  }
}

const byQuery = (query) => (item) => {
  return !query || item.name.toLowerCase().includes(query.toLowerCase());
};

export default App;
