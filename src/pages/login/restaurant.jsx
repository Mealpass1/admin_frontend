import React from "react";
import styled from "styled-components";

import { AiOutlineEye } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { FiLock } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <div className="settings" onClick={goBack}>
        <IoMdArrowRoundBack />
      </div>
      <Logo>
        <img src="/logo.svg" alt="Logo" />
      </Logo>
      <div className="image">
        <img src="/images/three.jpg" alt="image" />
      </div>
      <div className="form">
        <div className="text">
          <p className="title">Login to Access Restaurant Page</p>
        </div>
        <form>
          <div className="inputs">
            <div className="row">
              <label htmlFor="email">
                <BiUserCheck />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Restaurant Username"
              />
            </div>
            <div className="row">
              <label htmlFor="password">
                <FiLock />
              </label>
              <input
                type="password"
                id="password"
                placeholder="Super Password"
              />
              <label htmlFor="password">
                <AiOutlineEye />
              </label>
            </div>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  padding: 10px 0 0 0;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: var(--white);

  .settings {
    width: 100vw;
    height: 40px;
    font-size: 2em;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .error {
    width: 80vw;
    z-index: 1000;
    height: 40px;
    background: var(--red);
    position: fixed;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    top: 10px;
    font-size: 1em;
  }

  .image {
    width: 80vw;
    height: 200px;
    margin: 15px 0;

    img {
      width: 100%;
    }
  }

  .form {
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .text {
      width: 100%;
      height: 30px;

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
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .inputs {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .row {
          width: 100%;
          height: 50px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: var(--grayish);
          padding: 0 15px;
          border-radius: 8px;
          margin: 5px 0;

          label {
            font-size: 1em;
            color: #828282;
          }

          input {
            margin: 0 15px;
            width: 80%;
            height: 80%;
            border: none;
            background: transparent;
            outline: none;
          }
        }
      }

      button {
        width: 100%;
        height: 45px;
        font-size: 1em;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        background: var(--gray);
        margin: 10px 0 5px 0;
      }
    }
  }
`;

const Logo = styled.div`
  width: 7em;
  height: 7em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 50%;
  padding: 1em;
  background: var(--bright);

  img {
    width: 90%;
  }
`;

export default Login;
