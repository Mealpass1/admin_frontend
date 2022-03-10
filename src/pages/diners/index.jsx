import * as React from "react";
import styled from "styled-components";

import axios from "../../features/axios";

import NavBar from "../../components/nav";
import Box from "../../components/diners/box";
import Add from "../../components/diners/add";

const Diners = () => {
  const [diners, setDiners] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const showAdd = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    axios.get("/diner/diners").then((response) => {
      setDiners(response.data.data);
    });
  }, []);

  return (
    <Container>
      {show == true ? <Add close={showAdd} /> : <></>}
      <NavBar name="Diners" />
      <div className="top">
        <p>All</p>
        <button onClick={showAdd}>Add+</button>
      </div>
      <div className="content">
        {diners.length == 0 ? (
          <p>No diners</p>
        ) : (
          <>
            {diners.map((diner, index) => (
              <Box key={index} diner={diner} />
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

export default Diners;
