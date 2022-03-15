import * as React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import axios from "../../features/axios";

import NavBar from "../../components/nav";
import Box from "../../components/restaurants/box";
import Add from "../../components/restaurants/add";

const Restaurants = () => {
  const [show, setShow] = React.useState(false);

  const showAdd = () => {
    setShow(!show);
  };

  const { isLoading, data } = useQuery("diners", async () => {
    return await axios.get("/restaurant").then((res) => res.data);
  });

  return (
    <Container>
      {show == true ? <Add close={showAdd} /> : <></>}
      <NavBar name="Restaurants" />
      <div className="top">
        <p>All</p>
        <button onClick={showAdd}>Add+</button>
      </div>
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton
            variant="rectangular"
            width={350}
            height={320}
            style={{ borderRadius: 5 }}
          />
          <Skeleton
            variant="rectangular"
            width={350}
            height={320}
            style={{ borderRadius: 5 }}
          />
        </Stack>
      ) : (
        <>
          <div className="content">
            {data?.data?.length == 0 ? (
              <p>No restaurants</p>
            ) : (
              <>
                {data?.data?.map((restaurant, index) => (
                  <Box key={index} restaurant={restaurant} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  .top {
    width: 90%;
    height: 40px;
    border-bottom: 1px solid var(--grayish);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: auto;

    button {
      width: 100px;
      height: 25px;
      border-radius: 30px;
      border: none;
      color: var(--white);
      background: var(--bright);
    }

    p {
      padding: 12px 10px;
      color: var(--bright);
      border-bottom: 3px solid var(--bright);
    }
  }

  .content {
    width: 100%;
    height: auto;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export default Restaurants;
