import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";

const Box = ({ product }) => {
  const push = useNavigate();
  const query = useParams();

  const goToProduct = () => {
    push(`/explore/products/${query.id}/${product._id}`);
  };

  const variants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
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
  width: 50%;
  height: auto;

  .box {
    min-width: 38%;
    height: 180px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    img {
      width: 100%;
      height: 95%;
    }

    .title {
      font-weight: bold;
    }
  }
`;

export default Box;