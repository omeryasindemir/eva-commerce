import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
    <React.Fragment>
      <Header />
      <div className="login_form_wrapper">
        <form style={{ padding: "20px" }} onSubmit={handleSubmit}>
          <div className="login_information">
            <p>
              <span>E-Mail :</span> homework@eva.guru
            </p>
            <p>
              <span>Password :</span> Homeworkeva1**
            </p>
          </div>
          <br />
          <div className="login_inputs">
            <div>
              <label htmlFor="">E-Mail : </label>
              <br />
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
              <br />
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="login_btn">
            <button
              style={{ padding: "10px", borderRadius: "10px" }}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
