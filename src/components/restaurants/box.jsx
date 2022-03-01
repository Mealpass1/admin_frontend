import * as React from "react";
import styled from "styled-components";

const Box = ({ restaurant }) => {
  const [show, setShow] = React.useState(false);

  const showDetails = () => {
    setShow(!show);
  };

  return (
    <Container>
      <div className="top">
        <div className="image">
          <img src={restaurant?.picture} alt={restaurant?.businessName} />
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Name</p>
        </div>
        <div className="content">
          <p className="bold">{restaurant?.username}</p>
          <p>{restaurant?.businessName}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Status</p>
        </div>
        <div className="content">
          <p className="status">
            {restaurant?.status != "online" ? <>offline</> : <>online</>}
          </p>
          {/* <p>Last Login: {restaurant?.lastLogin}</p> */}
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Email</p>
        </div>
        <div className="content">
          <p>{restaurant?.email}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Total Revenues</p>
        </div>
        <div className="content">
          <p className="bold">{restaurant?.revenue}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Transfer Cashout</p>
        </div>
        <div className="content">
          <p className="bold">{restaurant?.cashout}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Action</p>
        </div>
        <div className="content">
          <button onClick={showDetails}>View more</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 430px;
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
    height: 60px;
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
