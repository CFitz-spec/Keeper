import React, { useState } from "react";

function Register(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.addUser(user);
    setUser({
      username: "",
      password: "",
    });
    event.preventDefault();
  }
  return (
    <form className="register-form" onSubmit={submitNote}>
      <input
        type="email"
        name="username"
        placeholder="User Email"
        onChange={handleChange}
        value={user.username}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
        value={user.password}
      />
      <button onClick={submitNote}>Register</button>
    </form>
  );
}

export default Register;
