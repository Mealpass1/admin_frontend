import * as React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "react-query";

import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";

import axios from "../../features/axios";

import Dishes from "../../components/explore/restaurant/container";

const Restaurant = () => {
  const router = useNavigate();
  const query = useParams();
  const [token, setToken] = React.useState("");
  const [active, setActive] = React.useState("all");

  const goBack = () => {
    router("/explore/restaurants");
  };

  const goCart = () => {
    router("/explore/cart");
  };

  const handleSearch = (key) => {
    console.log(key);
  };

  const { isLoading, data } = useQuery("restaurant", async () => {
    return await axios
      .get(`/restaurant/${query.id}`, {
        headers: { auth: `${token}` },
      })
      .then((res) => res.data);
  });

  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <Container>
      <Top>
        <div className="back">
          <div onClick={goBack}>
            <IoArrowBackOutline />
          </div>
        </div>
        <div className="company">
          <div className="logo">
            <img src={data?.data?.picture} alt="Logo" />
          </div>
          <p className="title">welcome to {data?.data?.businessName}</p>
          <p className="para">{data?.data?.description}.</p>
        </div>
        <div className="cart">
          <CartIcon onClick={goCart}>
            <FaShoppingCart />
          </CartIcon>
        </div>
      </Top>
      <Content>
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="search here"
            onChange={handleSearch}
          />
        </div>
        <button>search</button>
      </Content>
      <Nav>
        <div className="paras">
          {data?.data?.dishTypes?.map((category, index) => (
            <p
              key={index}
              className={active == category ? `active` : ""}
              onClick={() => setActive(category)}
            >
              {category}
            </p>
          ))}
        </div>
      </Nav>
      <Dishes active={active} dishes={data?.data?.dishes} />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  margin: 0 0 5em 0;
  height: auto;
  overflow: hidden;
`;

const CartIcon = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  font-size: 1.5em;
`;

const Content = styled.div`
  width: 100vw;
  height: 30px;
  margin: auto;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .search {
    width: 70%;
    height: 90%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: var(--grayish);

    input {
      width: 85%;
      height: 100%;
      text-align: center;
      border: none;
      outline: none;
      background: transparent;
    }
  }

  button {
    width: 25%;
    height: 100%;
    border-radius: 10px;
    border: none;
    background: var(--gray);
  }
`;

const Nav = styled.div`
  width: auto;
  height: 30px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  .paras {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow: scroll;

    p {
      text-transform: capitalize;
    }
  }

  p {
    width: 80px;
    height: 30px;
    font-size: 1.1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--opacity);
  }

  p.active {
    color: var(--bright);
    border-bottom: 2px solid var(--bright);
  }
`;

const Top = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 175px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .back {
    width: 15%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.8em;
  }

  .company {
    width: 60%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      width: 75px;
      height: 75px;
      margin: 0 0 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    p.para {
      text-align: center;
      line-height: 1em;
    }

    p.title {
      text-align: center;
      font-weight: bold;
      font-size: 1.1em;
      text-transform: uppercase;
      margin: 0 0 5px 0;
    }
  }

  .cart {
    width: 15%;
    height: 80%;
  }
`;

export default Restaurant;
