import * as React from "react";
import styled from "styled-components";

import Box from "./box";

const Container = ({ active, dishes }) => {
  if (dishes?.length > 0) {
    return (
      <Content>
        <div className="products">
          {active == "all" ? (
            <React.Fragment>
              {dishes?.map((product, index) => (
                <Box product={product} key={index} />
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {dishes?.map((product, index) => (
                <React.Fragment key={index}>
                  {product.category == active ? (
                    <Box product={product} key={index} />
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </div>
      </Content>
    );
  } else {
    return (
      <Content>
        <p>No products yet...</p>
      </Content>
    );
  }
};

const Content = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 0 0 10px;

  .title {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    p {
      font: 1.2em;
      font-weight: bold;
      text-transform: capitalize;
    }
  }

  .products {
    width: 100%;
    padding: 0 20px 0 0;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export default Container;
