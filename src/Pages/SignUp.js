import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import LogInForm from "../Components/SignUpComponents/LogInForm";
import SignUpForm from "../Components/SignUpComponents/SignUpForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  });
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>SignUp</h1> : <h1>LogIn</h1>}
        {!flag ? <SignUpForm /> : <LogInForm />}
        {!flag ? (
          <p
            className="toggleSign"
            style={{ cursor: "pointer" }}
            onClick={() => setFlag(!flag)}
          >
            Already have an Account? click here to LogIn.
          </p>
        ) : (
          <p
            className="toggleSign"
            style={{ cursor: "pointer" }}
            onClick={() => setFlag(!flag)}
          >
            don't have an Account? click here to SignUp.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
