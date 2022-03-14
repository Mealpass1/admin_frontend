import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import NavBar from "../../components/nav";
import axios from "../../features/axios";

const Explore = () => {
  const [packages, setPackages] = React.useState([]);

  React.useEffect(() => {
    axios.get("/package").then((response) => {
      setPackages(response.data.data);
    });
  }, []);

  return (
    <Container>
      <NavBar name="Explore" />
      <div className="top">
        <p>All</p>
        <Link to="/explore/restaurants">Add+</Link>
      </div>
      <div className="content">
        {packages.length == 0 ? (
          <>
            <p>No packages</p>
          </>
        ) : (
          <>
            {packages.map((item, index) => (
              <p key={index}>Package {index}</p>
            ))}
          </>
        )}
      </div>
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
