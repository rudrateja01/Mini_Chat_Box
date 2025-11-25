import React, { useState } from "react";
import "./SignupStyle.css";
import useSignup from "../../Hooks/useSignup";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import hubly from "../../assets/logos/hubly.png";
import man from "../../assets/logos/man.png";

const Signup = () => {
  // const { signup } = useAuth();
  const {signup,error} = useSignup();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  // const {signup,error} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email,password);
    const result = await signup(firstname, lastname, email, password, confirmpassword);
     if (!result) return;
     navigate("/login"); 

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="main-form">
      {/* <img src={hubly} id="logo" alt="" /> */}
      <div className="left">
        <div className="form">
          <form>
            <h1>Create an account </h1><span className="signin-link" onClick={()=>navigate("/login")}>sign in instead</span>
            <div className="field">
              <label htmlFor="">First name : </label>
              <input
                type="string"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                value={firstname}
              />
            </div>
            <div className="field">
              <label htmlFor="">Last name : </label>
              <input
                type="string"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                value={lastname}
              />
            </div>
            <div className="field">
              <label htmlFor="">Email : </label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="field">
              <label htmlFor="">Password : </label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div className="field">
              <label htmlFor="">Confirm Password : </label>
              <input
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmpassword}
              />
            </div>
            <p>
              By creating an account, I agree to our <span>Terms of use</span>
              <br />
              and <span>Privacy Policy</span>
            </p>
            <button onClick={handleSubmit}>Create an account</button>
          </form>
        </div>
        <p>
          This site is protected by reCAPTCHA and the
          <span>Google Privacy Policy</span> and <span>Terms of Service</span>
          apply.
        </p>
      </div>

      <div className="right">
        <img src={man} alt="" />
      </div>
    </div>
  );
};

export default Signup;
