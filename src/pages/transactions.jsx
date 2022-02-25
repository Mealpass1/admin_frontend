import * as React from "react";
import styled from "styled-components";

import NavBar from "../components/nav";
import Box from "../components/transactions/box";

const Transactions = () => {
  const [transactions, setTransactions] = React.useState([]);

  return (
    <Container>
      <NavBar name="Transactions" />
      <div className="top">
        <p>All</p>
      </div>
      <div className="content">
        {transactions.length == 0 ? (
          <p>No transactions</p>
        ) : (
          <>
            {transactions.map((transaction, index) => (
              <Box key={index} transaction={transaction} />
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

export default Transactions;
