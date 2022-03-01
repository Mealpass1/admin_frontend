import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Box = ({ product }) => {
  const router = useNavigate();

  const goToProduct = () => {
    router(`/diner/recipes/${restaurant}/${product._id}`);
  };

  const variants = {
    initial: {
      x: 20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        staggerChildren: 1,
      },
    },
  };

  return (
    <Container>
      <motion.div
        className="box"
        onClick={goToProduct}
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <img src={product?.image} alt={product?.name} />
        <p className="title">{product?.name}</p>
        <p>{product?.price} RWF</p>
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: auto;

  .box {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    margin: 0px 10px 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    img {
      width: 180px;
      height: 150px;
    }

    p {
      margin: 0 0 0 2px;
      font-size: 12px;
    }

    .title {
      line-height: 25px;
      font-weight: bold;
      text-transform: capitalize;
    }
  }
`;

export default Box;
