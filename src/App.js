import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { fetchData, usersAdapter } from "./redux/slice";
import store from "./redux/store";

function App() {
  const dispatch = useDispatch();
  const [users, handleUsers] = useState([]);
  const [search, handleSearch] = useState("");

  const handleInsertion = () => {
    dispatch(fetchData());
  };

  const handleDisplay = () => {
    const userSelector = usersAdapter.getSelectors(
      (state) => state.user_reducer
    );
    const allUsers = userSelector.selectAll(store.getState());
    handleUsers((prevState) => [...prevState, ...allUsers]);
  };

  const searchStr = (e) => {
    handleSearch(e.target.value);
  };

  const updatedUI = users
    .filter((data) => data.name.startsWith(search))
    .map((user) => {
      return (
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user["Phone Number"]}</td>
        </tr>
      );
    });

  return (
    <div className="App">
      <button onClick={handleInsertion}>Refresh Data</button>
      <button onClick={handleDisplay}>Display Data</button>
      <div style={{ margin: "2rem" }}>
        {users.length !== 0 ? (
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => searchStr(e)}
          />
        ) : (
          ""
        )}
        <table style={{ margin: "1rem" }}>
          <tbody>{updatedUI}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
