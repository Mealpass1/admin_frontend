import * as React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";

import { AiOutlineRight } from "react-icons/ai";

import Box from "./box";
import axios from "../../../features/axios";

const Container = ({ restaurant }) => {
  const push = useNavigate();
  const { pathname } = useLocation();
  const [token, setToken] = React.useState("");

  const { data } = useQuery(`dishes of ${restaurant._id}`, async () => {
    return await axios
      .get(`dish/restaurant/${restaurant._id}`, { headers: { auth: `${token}` } })
      .then((res) => res.data);
  });

  const goToRestaurant = () => {
    push(`${pathname}/${restaurant._id}`);
  };


  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <Content>
      <div className="title">
        <p>{restaurant?.businessName}</p>
        <p onClick={goToRestaurant}>
          See All <AiOutlineRight />
        </p>
      </div>
      <div className="container">
        {data?.data?.length > 0 ? (
          data?.data?.map((product, index) => (
            <div className="scroll" key={index}>
              <Box product={product} restaurant={restaurant._id} />
            </div>
          ))
        ) : (
          <p className="no_dishes">No dishes yet</p>
        )}
      </div>
    </Content>
  );
};

const Content = styled.div`
  height: auto;
  width: auto;

  .container {
      width: auto;
      height: 200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      overflow: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
    padding: 0 0 0 5px;

    .no_dishes {
      text-align: center;
      text-transform: capitalize;
      font-size: small;
    }
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .title {
    width: 100%;
    height: 20px;
    margin: 15px 0 0 5px;
    padding: 0 10px 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    p:first-child {
      text-transform: capitalize;
      font-weight: 700;
    }
  }
`;

export default Container;
