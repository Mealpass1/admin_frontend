import * as React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import axios from "../../features/axios";

import { BiUser, BiUserCheck } from "react-icons/bi";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";

const Add = ({ close }) => {
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const variants = {
    initial: {
      scale: 0.1,
    },
    visible: {
      scale: 1,
    },
  };

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("/diner/signup", {
        fullname: data.names,
        email: data.email,
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        setLoading(false);

        if (!response.data.error) {
          toast.success("Diner added", {
            toastId: "custome-id",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.error("Something went wrong!", {
            toastId: "custome-id",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }

        close();
      })
      .catch((response) => {
        toast.error("Something went wrong!", {
          toastId: "custome-id",
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };

  return (
    <Container>
      <motion.div
        className="container"
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <div className="content">
          <div className="top">
            <p>Add Diner</p>
            <div className="close" onClick={() => close()}>
              X
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <label htmlFor="names">
                <BiUser />
              </label>
              <input
                type="text"
                id="names"
                placeholder="Full Name"
                {...register("names", { required: true })}
              />
            </div>
            {errors.names?.type === "required" && (
              <p className="perror">Please enter full names</p>
            )}
            <div className="row">
              <label htmlFor="email">
                <FiMail />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="perror">Please enter email</p>
            )}
            <div className="row">
              <label htmlFor="username">
                <BiUserCheck />
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </div>
            {errors.username?.type === "required" && (
              <p className="perror">Please enter username</p>
            )}
            <div className="row">
              <label htmlFor="password">
                <FiLock />
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <label htmlFor="password">
                <AiOutlineEye />
              </label>
            </div>
            {errors.password?.type === "required" && (
              <p className="perror">Please enter password</p>
            )}
            <div className="submit">
              <button type="submit">
                {loading ? (
                  <>
                    <img src="/loader.svg" alt="loader" />
                  </>
                ) : (
                  <>
                    <p>Sign up</p>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="cancel" onClick={() => close()}></div>
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  .container {
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
    position: fixed;

    .cancel {
      width: 100vw;
      height: 100vh;
      position: absolute;
      z-index: -100;
    }

    .content {
      width: 85vw;
      height: auto;
      padding: 10px 0;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;
      background: var(--white);

      .top {
        width: 90%;
        height: 50px;
        margin: 5px 0;
        display: flex;
        font-size: 1em;
        font-weight: bold;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid var(--black);

        p {
          border: none;
        }

        .close {
          width: 30px;
          height: 30px;
          border: 1px solid var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      }

      .form {
        width: 90%;
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .row {
          width: 100%;
          margin: 5px 0;
          height: 45px;
          display: flex;
          flex-direction: row;
          align-items: center;
          background: var(--grayish);
          padding: 0 15px;
          border-radius: 8px;

          p {
            width: 100%;
            line-height: 25px;
            color: var(--red);
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

      .submit {
        width: 90%;
        height: 45px;
        margin: 10px 0;
        font-size: 1em;
        font-weight: 700;
        border: none;
        border-radius: 5px;

        button {
          width: 100%;
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1em;
          font-weight: 700;
          border: none;
          border-radius: 5px;
          background: var(--gray);

          img {
            width: 20%;
          }
        }
      }
    }
  }
`;

export default Add;
