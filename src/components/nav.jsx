import * as React from "react";
import styled from "styled-components";

import { FaBars } from "react-icons/fa";

import axios from "../features/axios";
import SideBar from "./sidebar";

const NavBar = ({ name }) => {
  const [bar, setBar] = React.useState(false);
  const [admin, setAdmin] = React.useState({});

  const openSideBar = () => {
    setBar(!bar);
  };

  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.get("/admin", { headers: { auth: `${token}` } }).then((response) => {
      setAdmin(response.data.data);
    });
  }, []);

  return (
    <React.Fragment>
      {bar == true ? <SideBar openBar={openSideBar} /> : <></>}
      <Container>
        <div className="bars" onClick={openSideBar}>
          <FaBars />
        </div>
        <div className="about">
          <div className="name">
            <p className="title">{name}</p>
          </div>
          <div className="restaurant">
            <div className="para">
              <p className="bold">{admin?.names}</p>
              <p>Admin</p>
            </div>
            <div className="image">
              <img src={admin?.image} alt="admin" />
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--grayish);

  .bars {
    width: 10%;
    height: 100%;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about {
    width: 80%;
    height: 70%;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    background: var(--white);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .name {
      width: 38%;
      height: 100%;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      .title {
        font-weight: bold;
        font-size: 1em;
      }
    }

    .restaurant {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      .para {
        margin: 0 10px;
        text-align: end;

        .bold {
          font-weight: bold;
        }
      }

      .image {
        width: 30%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 55%;
        }
      }
    }
  }
`;

export default NavBar;
