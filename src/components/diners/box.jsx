import * as React from "react";
import styled from "styled-components";

const Box = ({ diner }) => {
  const goDiner = () => {};

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const lastLogin = diner?.lastLogin;
  const date = new Date(lastLogin);

  return (
    <Container>
      <div className="top">
        <div className="image">
          <img src={diner?.image} alt={diner?.fullname} />
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Name</p>
        </div>
        <div className="content">
          <p className="bold">@{diner?.username}</p>
          <p>{diner?.fullname}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Status</p>
        </div>
        <div className="content">
          <p className="status">
            {diner?.status != "online" ? <>offline</> : <>online</>}
          </p>
          <p>
            Last login: <span> </span>
            {`${date.getDate()}/${
              months[date.getMonth()]
            }/${date.getFullYear()}`}
          </p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Email</p>
        </div>
        <div className="content">
          <p>{diner?.email}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Total Purchases</p>
        </div>
        <div className="content">
          <p className="bold">{diner?.purchases}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Action</p>
        </div>
        <div className="content">
          <button onClick={goDiner}>View more</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 320px;
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
    border-radius: 20px;
    font-weight: bold;
    color: green;
  }

  .top {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    .image {
      width: 11%;
      height: 80%;

      img {
        width: 60%;
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
