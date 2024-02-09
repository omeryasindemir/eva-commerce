import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const BASE_URI = "https://iapitest.eva.guru";

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(BASE_URI + "/oauth/token", {
        Email: Email,
        Password: Password,
        GrantType: "password",
        Scope: "amazon_data",
        ClientId: "C0001",
        ClientSecret: "SECRET0001",
        RedirectUri: "https://api.eva.guru",
      })
      .then(function (response) {
        const token = response.data.Data.AccessToken;
        localStorage.setItem("JWT_TOKEN", token);
        navigate("/dash");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form style={{padding: "20px"}} onSubmit={handleSubmit}>
      <p>E-Mail : homework@eva.guru</p>
      <p>Password : Homeworkeva1**</p>
      <br />
      <div>
        <label htmlFor="">E-Mail : </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="">Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button style={{padding: "10px", borderRadius: "10px"}} type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
