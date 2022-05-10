import * as React from "react";
import styled from "styled-components";
import Details from "./details";

const Box = ({ basket }) => {
  const [details, showDetails] = React.useState(false);

  const handleDetails = () => {
    showDetails(!details);
  };

  return (
    <Container>
      {details ? (
        <Details
          image={basket?.image}
          dishes={basket?.dishes}
          close={handleDetails}
          name={basket?.name}
        />
      ) : (
        <></>
      )}
      <div className="item">
        <div className="title">
          <p>Name</p>
        </div>
        <div className="content">
          <p>{basket?.name} Package</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Subscribers</p>
        </div>
        <div className="content">
          <p>{basket?.subscribers}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Restaurants</p>
        </div>
        <div className="content">
          {basket?.restaurants?.map((res, index) => (
            <p key={index}>{res?.name},</p>
          ))}
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Price</p>
        </div>
        <div className="content">
          <p>{basket?.price} RWF</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Revenue</p>
        </div>
        <div className="content">
          <p>{basket?.revenue} RWF</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Action</p>
        </div>
        <div className="content" onClick={handleDetails}>
          <button>View more</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 300px;
  margin: 10px 0;
  padding: 10px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .bold {
    font-weight: bold;
  }

  .red {
    font-weight: bold;
    color: red;
  }

  .status {
    padding: 5px 10px;
    background: var(--opacity);
    border-radius: 20px;
    font-weight: bold;
    color: green;
  }

  .top {
    width: 100%;
    height: 50px;
    padding: 0 10px;
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .image {
      width: 11%;
      height: 80%;

      img {
        width: 80%;
      }
    }
  }

  .item {
    width: 90%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--grayish);

    .title {
      width: 45%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-weight: bolder;
    }

    .content {
      width: 55%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;

      button {
        width: 60%;
        height: 45%;
        border-radius: 5px;
        border: none;
        background: var(--bright);
        color: var(--white);
      }
    }
  }
`;

export default Box;
