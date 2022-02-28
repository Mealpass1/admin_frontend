import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BiUserCheck } from "react-icons/bi";
import { FiLock } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";

import axios from "../features/axios";
import Logo from "../components/logo";

const Login = () => {
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("/admin/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        setLoading(false);

        if (response.data.status == "error") {
          toast.error("invalid email or password", {
            toastId: "custome-id",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          sessionStorage.setItem("token", response.data.data);
          router("/diners");
        }
      });
  };

  const goDiner = () => {
    router.push("/login/diner");
  };

  const goRestaurant = () => {
    router.push("/login/restaurant");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Logo />
      <div className="image">
        <img src="/images/one.jpg" alt="image" />
      </div>
      <div className="form">
        <div className="text">
          <p className="title">Log In as an Admin</p>
          <p className="para">Log in to access your MealPass Dashboard</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div className="row">
              <label htmlFor="email">
                <BiUserCheck />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="perror">Please enter your email</p>
            )}
            <div className="row">
              <label htmlFor="password">
                <FiLock />
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
              <label htmlFor="password" onClick={handleShowPassword}>
                <AiOutlineEye />
              </label>
            </div>
            {errors.password?.type === "required" && (
              <p className="perror">Please enter your password</p>
            )}
          </div>
          <Link to="/forgotpassword">Forgot password?</Link>
          <button type="submit" disabled={loading ? `disabled` : ``}>
            {loading ? (
              <img src="/loader.svg" alt="loader" />
            ) : (
              <>
                <p>Log In</p>
              </>
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: auto;
  padding: 10px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: var(--white);

  .image {
    margin: 15px 0;
  }

  .error {
    width: 80vw;
    height: 40px;
    z-index: 1000;
    background: var(--red);
    position: fixed;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    top: 10px;
    font-size: 1em;
  }

  .form {
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .login {
      width: 100%;
      height: 70px;
      font-weight: 400;
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

    form {
      width: 100%;

      a {
        height: 15px;
        width: 100%;
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: var(--black);
      }
      button {
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1em;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        background: var(--gray);
        margin: 10px 0 5px 0;

        img {
          width: 100%;
          height: 100%;
        }
      }

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

          input {
            font-size: 1em;
          }
        }

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

    .text {
      width: 100%;
      height: 60px;

      .title {
        font-size: 1em;
        font-weight: 700;
      }

      .para {
        font-size: 1em;
      }
    }

    .index {
      margin: 10px 0 10px -70%;
      width: 60px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1em;
      border: none;
      border-radius: 5px;
    }
    .perror {
      color: var(--red);
    }
  }
`;

export default Login;
