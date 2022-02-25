import * as React from "react";
import styled from "styled-components";

const Box = ({ transaction }) => {
  const [show, setShow] = React.useState(false);

  const showDetails = () => {
    setShow(!show);
  };

  return (
    <Container>
      {show == true ? (
        <Details transaction={transaction} close={showDetails} />
      ) : (
        <></>
      )}

      <div className="top">
        <div className="select"></div>
      </div>
      <div className="item">
        <div className="title">
          <p>Order</p>
        </div>
        <div className="content">
          <p>{transaction?.id}</p>
          <p>{transaction?.name}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Diner</p>
        </div>
        <div className="content">
          <p>{transaction?.diner}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Restaurant</p>
        </div>
        <div className="include">
          <p>{transaction?.restaurant}</p>
          <div className="image">
            <Image
              src={transaction?.image}
              alt={transaction?.name}
              width="40"
              height="30"
            />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>TimeStamp</p>
        </div>
        <div className="content">
          <p>Paid on: {transaction?.timestamp}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Price</p>
        </div>
        <div className="content">
          <p>{transaction?.price}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Total serving</p>
        </div>
        <div className="content">
          <p>{transaction?.tota_serving}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Paid Amount</p>
        </div>
        <div className="content">
          <p>{transaction?.paid}</p>
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
