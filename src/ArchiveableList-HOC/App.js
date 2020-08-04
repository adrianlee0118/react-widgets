import React from "react";
import "./App.css";

const withArchive = (Component) =>
  class withArchive extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        archivedItems: [],
      };
      this.onArchive = this.onArchive.bind(this);
    }
    onArchive(id) {
      const { archivedItems } = this.state;
      this.setState({
        archivedItems: [...archivedItems, id],
      });
    }
    render() {
      const { list } = this.props;
      const { archivedItems } = this.state;
      const filteredList = list.filter(byArchived(archivedItems));
      return <Component list={filteredList} onArchive={this.onArchive} />;
    }
  };

const List = ({ list, onArchive }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>
        <span>{item.name}</span>
        <span>
          <button type="button" onClick={() => onArchive(item.id)}>
            Archive
          </button>
        </span>
      </li>
    ))}
  </ul>
);

const byArchived = (archivedItems) => (item) =>
  !archivedItems.includes(item.id);

const ListWithArchive = withArchive(List);

const App = () => {
  <ListWithArchive list={list} />;
};

export default App;
