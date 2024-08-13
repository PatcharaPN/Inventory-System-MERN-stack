import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputButton from "../../components/InputButton/InputButton";
import { useAppDispatch } from "../../store/store";
import { loginUser } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [slideOut, setSlideOut] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => setSlideOut(true);
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLInputElement | HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
    console.log({ email, password });
  };

  return (
    <div className={`auth-container ${slideOut ? "slide-out" : ""}`}>
      <div className="auth-form">
        <div className="form">
          <div className="auth-section">
            <p className="header-text">Login</p>
            <form action="" className="login form" onSubmit={handleSubmit}>
              <InputButton
                onChange={(e) => setemail(e.target.value)}
                name="email"
                value={email}
                label={"Email Address"}
                placholder={"You@example.com"}
              />
              <InputButton
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                label={"Password"}
                placholder={"Enter 6 character or more"}
              />
              <div className="rememberme">
                <input type="checkbox" />
                <p>Remember me</p>
              </div>

              <button type="submit" className="btn login">
                Login
              </button>
            </form>
            <div className="social-login">
              <div className="social-btn">
                <Icon width={50} icon="devicon:google" />
              </div>
              <div className="social-btn">
                <Icon width={50} icon="logos:facebook" />
              </div>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img
            src="/assets/undraw_login_re_4vu2.svg"
            width={400}
            height={400}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
