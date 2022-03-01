import * as React from "react";
import reactDom from "react-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";

import { FaImage } from "react-icons/fa";
import { FiCodesandbox } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoFastFoodSharp } from "react-icons/io5";

const SideBar = ({ openBar }) => {
  const router = useLocation();
  const navigate = useNavigate();

  const variants = {
    initial: {
      x: -300,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleDiners = () => {
    navigate("/diners");
  };
  const handleRestaurants = () => {
    navigate("/restaurants");
  };
  const handleTransactions = () => {
    navigate("/transactions");
  };
  const handleExplore = () => {
    navigate("/explore");
  };
  const handleLogout = () => {};

  return reactDom.createPortal(
    <Container>
      <motion.div
        className="container"
        variants={variants}
        initial="initial"
        animate="visible"
        exit="initial"
      >
        <div className="content">
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <p className="title">General</p>
          <div className="nav">
            <div
              className={router.pathname.includes("diners") ? "active" : "item"}
              onClick={handleDiners}
            >
              <FaImage />
              <p>Diners</p>
            </div>
            <div
              className={
                router.pathname.includes("restaurants") ? "active" : "item"
              }
              onClick={handleRestaurants}
            >
              <FiCodesandbox />
              <p>Restaurants</p>
            </div>
            <div
              className={
                router.pathname.includes("transactions") ? "active" : "item"
              }
              onClick={handleTransactions}
            >
              <CgProfile />
              <p>Transactions</p>
            </div>
            <div
              className={
                router.pathname.includes("explore") ? "active" : "item"
              }
              onClick={handleExplore}
            >
              <IoFastFoodSharp />
              <p>Explore</p>
            </div>
          </div>
          <div className="logout" onClick={handleLogout}>
            <p>Log Out</p>
          </div>
        </div>
        <div className="empty" onClick={() => openBar()}></div>
      </motion.div>
    </Container>,
    document.querySelector("#portal")
  );
};

const Container = styled.div`
  .container {
    z-index: 1000000;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .empty {
      width: 47%;
      height: 100%;
    }

    .content {
      width: 50%;
      height: 98%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
      background: var(--white);
      border-radius: 10px;

      .logo {
        width: 100%;
        height: 15%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 40%;
        }
      }

      .title {
        line-height: 60px;
        width: 90%;
        font-size: 1em;
        font-weight: bold;
        text-align: start;
      }

      .nav {
        width: 90%;
        height: 140px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;

        .item {
          width: 100%;
          height: 40%;
          font-size: 1em;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        }

        p {
          margin: 0 5px;
        }

        .active {
          width: 100%;
          height: 33%;
          font-size: 1em;
          color: var(--bright);
          font-weight: bold;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          border-right: 1px solid var(--bright);
        }
      }

      .logout {
        width: 80%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin: 15px 0;
        border-radius: 10px;
        background: var(--bright);
        color: var(--white);
      }
    }
  }
`;

export default SideBar;
