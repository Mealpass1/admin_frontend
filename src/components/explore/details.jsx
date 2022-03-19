import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Details = ({ name, image, dishes, close }) => {
  const [loading, setLoading] = React.useState(false);

  const variants = {
    initial: {
      scale: 0.1,
    },
    visible: {
      scale: 1,
    },
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
            <p>{name} package</p>
            <div className="close" onClick={() => close()}>
              X
            </div>
          </div>
          <div className="image">
            <img src={image} alt="package" />
          </div>
          <div className="dishes">
            <p className="title">
              Meals in <br /> package
            </p>
            <div className="names">
              {dishes?.map((dish, index) => (
                <p key={index}>{dish.dish.name},</p>
              ))}
            </div>
          </div>
          <button>Delete package</button>
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
    top: 0;
    left: 0;

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

      .image {
        width: 90%;
        height: 250px;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .dishes {
        width: 90%;
        height: auto;
        display: flex;
        align-items: flex-start;

        p.title {
          margin: 0 20px 0 5px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .names {
          width: 65%;
          display: flex;
          flex-wrap: wrap;
        }
      }

      button {
        width: 150px;
        height: 30px;
        margin: 20px 0;
        border: none;
        background: var(--red);
        color: var(--white);
        border-radius: 5px;
      }
    }
  }
`;

export default Details;
