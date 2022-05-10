import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

import axios from "../../features/axios";
import Content from "../../components/explore/restaurants/container";

const Restaurants = () => {
  const [token, setToken] = React.useState("");
  const navigate = useNavigate();

  const { isLoading, data } = useQuery("restaurants", async () => {
    return await axios
      .get("/restaurant", { headers: { auth: `${token}` } })
      .then((res) => res.data);
  });

  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  const handleSearch = (key) => {
    console.log(key);
  };


  const goExplore = () => {
    navigate("/explore");
  };

  const goCart = () => {
    navigate("/explore/cart");
  };

  return (
    <Container>
      <Top>
        <div className="settings" onClick={goExplore}>
          <IoMdArrowRoundBack />
        </div>
        <div className="company">
          <div className="logo">
            <img src="/logo.svg" alt="Logo" />
          </div>
          <p>welcome to mealpass</p>
        </div>
        <div className="cart">
          <CartIcon onClick={goCart}>
            <FaShoppingCart />
          </CartIcon>
        </div>
      </Top>
      <Header>
        <div className="nav">
          <p className={data?.data?.length > 0 ? `active` : ""}>
            Restaurants{data?.data?.length > 0 ? `(${data?.data?.length})` : ""}
          </p>
        </div>
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="search here"
            onChange={handleSearch}
          />
        </div>
      </Header>
      {isLoading ? (
        <>
          <Stack
            spacing={1}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={180}
              height={180}
              style={{
                borderRadius: 5,
                marginTop: 10,
                marginRight: 10,
                marginLeft: 20,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={180}
              height={180}
              style={{ borderRadius: 5, marginTop: 10, marginRight: 10 }}
            />
          </Stack>
          <Stack
            spacing={1}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={180}
              height={180}
              style={{
                borderRadius: 5,
                marginTop: 10,
                marginRight: 10,
                marginLeft: 20,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={180}
              height={180}
              style={{ borderRadius: 5, marginTop: 10, marginRight: 10 }}
            />
          </Stack>
        </>
      ) : (
        <div className="content">
          {data?.data?.length == 0 ? (
            <p className="error">No restaurants yet...</p>
          ) : (
            <>
              {data?.data?.map((restaurant, index) => (
                <Content restaurant={restaurant} key={index} />
              ))}
            </>
          )}
        </div>
      )}
    </Container>
  );
};

const Header = styled.div`
  width: 100vw;
  height: 30px;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .nav {
    width: 45%;
    height: 70%;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p.active {
      color: var(--bright);
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }

  .search {
    width: 60%;
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
`;

const Top = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .settings {
    width: 20%;
    height: 100%;
    padding: 1em 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.5em;
    font-weight: bold;
  }

  .cart {
    width: 20%;
    height: 80%;
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
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bright);
      border-radius: 50%;

      img {
        width: 70%;
        height: 70%;
      }
    }

    p {
      text-transform: uppercase;
      font-weight: bold;
      line-height: 30px;
    }
  }
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

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 5em 0;
  height: auto;
  overflow: hidden;

  .content {
    width: 100vw;
  }
`;

export default Restaurants;
