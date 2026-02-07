import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN Frontend Connected</h1>

      <h2>Users List</h2>

      {users.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}
    </div>
  );
}

export default App;
