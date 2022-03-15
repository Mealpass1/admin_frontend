import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import axios from "../../features/axios";
import NavBar from "../../components/nav";
import Box from "../../components/explore/box";

const Explore = () => {
  const { isLoading, data } = useQuery("diners", async () => {
    return await axios.get("/package").then((res) => res.data);
  });

  console.log(data);

  return (
    <Container>
      <NavBar name="Explore" />
      <div className="top">
        <p>All</p>
        <Link to="/explore/restaurants">Add+</Link>
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
              <>
                <p>No packages</p>
              </>
            ) : (
              <>
                {data?.data?.map((item, index) => (
                  <Box basket={item} key={index} />
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

    a {
      width: 100px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
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

export default Explore;
