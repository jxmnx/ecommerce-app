import Navbar from "../components/Navbar";
import { useState } from "react";

function Profile() {

  const [darkMode, setDarkMode] =
    useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) {
    return (
      <h2
        style={{
          padding: "40px"
        }}
      >
        Please login first
      </h2>
    );
  }

  return (
    <div
      className={
        darkMode
          ? "dark"
          : "light"
      }
    >

      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <div
        style={{
          padding: "50px"
        }}
      >

        <h1>
          My Profile
        </h1>

        <div
          className="cart-item"
          style={{
            maxWidth: "500px"
          }}
        >

          <h3>
            Name
          </h3>

          <p>
            {user.name}
          </p>

          <h3>
            Email
          </h3>

          <p>
            {user.email}
          </p>

          <h3>
            Role
          </h3>

          <p>
            {user.role}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;