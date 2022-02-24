import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { HiOutlineMail } from "react-icons/hi";

import Logo from "../components/logo";

const ForgotPassword = () => {
  return (
    <Container>
      <Logo />
      <img src="/images/two.jpg" alt="Three" />
      <div className="form">
        <div className="text">
          <p className="title">Forget Password</p>
          <p className="para">
            Provde your e-mail to get a password reset link
          </p>
        </div>
        <form>
          <div className="row">
            <label htmlFor="email">
              <HiOutlineMail />
            </label>
            <input type="email" placeholder="Email" id="email" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="login">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: var(--white);

  .form {
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .text {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      .title {
        font-size: 1em;
        font-weight: 700;
      }

      .para {
        font-size: 1em;
      }
    }

    form {
      width: 100%;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .row {
        width: 100%;
        height: 32%;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: var(--grayish);
        padding: 0 15px;
        border-radius: 8px;

        label {
          font-size: 1em;
          color: #828282;
        }

        input {
          margin: 0 15px;
          width: 80%;
          height: 30px;
          border: none;
          background: transparent;
          outline: none;
        }
      }

      button {
        width: 100%;
        font-size: 1em;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        height: 45px;
        background: var(--gray);
      }
    }

    .login {
      margin-top: 15px;
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      a {
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: 700;
        background: var(--grayish);
      }
    }
  }
`;

export default ForgotPassword;
