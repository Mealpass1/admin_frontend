import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { IoArrowBackOutline, IoBagCheckOutline } from "react-icons/io5";

import axios from "../../../features/axios";
import {
  add,
  getTotal,
  getFee,
  getMealserving,
} from "../../../state/reducers/cart";

import Box from "../../../components/explore/cart/box";
import Add from "../../../components/explore/cart/package";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [reflesh, setReflesh] = useState(false);
  const [token, setToken] = useState("");
  const total = useSelector((state) => state.cart.total) || 0;
  const fee = useSelector((state) => state.cart.fee) || 0;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    axios
      .get("/admin/cart", { headers: { auth: `${token}` } })
      .then((response) => {
        dispatch(add(response.data.data));
        dispatch(getTotal());
        dispatch(getFee());
        dispatch(getMealserving());
        setData(response.data.data);
      });
  }, []);

  const all = useSelector((state) => state.cart.cart);

  const openShow = () => {
    setShow(!show);
  };

  const refleshCart = () => {
    setReflesh(!reflesh);
  };

  const goBack = () => {
    router(-1);
  };

  const handleDelete = async (id) => {
    axios
      .delete(`/admin/cart/delete/${id}`, { headers: { auth: `${token}` } })
      .then((response) => {
        refleshCart();
        if (response.data.status == "error") {
          toast.error("Unable to delete item", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.success("Item deleted", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      });
  };

  console.log(data);

  return (
    <Layout>
      {show == true ? <Add close={openShow} /> : <></>}
      <Top>
        <div className="top">
          <div className="back" onClick={goBack}>
            <IoArrowBackOutline />
          </div>
          <div className="settings"></div>
        </div>
        <div className="bottom">
          <div className="one">
            <p>My Cart</p>
          </div>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="two">
            <p>{data.length} items in cart</p>
          </div>
          <div className="three">
            <p>
              <span>Note: </span>
              Meal Serving = Your Order Quantity x Your Days per week
            </p>
          </div>
        </div>
      </Top>
      <Content>
        <Container>
          {data?.map((item, index) => (
            <Box
              item={item}
              key={index}
              delete={handleDelete}
              reflesh={refleshCart}
            />
          ))}
        </Container>
        <div className="summary">
          <div className="top">
            <table>
              <tbody>
                <tr>
                  <td>Meal Cost</td>
                  <td>{total} RWf</td>
                </tr>
                <tr>
                  <td>Service Fee</td>
                  <td>{fee} RWF</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>{total + fee} RWF</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="checkout" onClick={openShow}>
            {loading ? (
              <img src="/loader.svg" alt="loader" />
            ) : (
              <>
                <IoBagCheckOutline />
                <p>Publish to explore</p>
              </>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const Layout = styled.div``;

const Content = styled.div`
  .summary {
    width: 100%;
    height: 180px;
    margin: auto;
    position: sticky;
    bottom: 0;
    font-size: 13px;

    .top {
      width: 95%;
      margin: auto;
      height: 60%;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #cfcfcf;

      table {
        width: 60%;

        tbody tr td,
        th {
          text-align: start;
        }
      }
    }

    .checkout {
      width: 95%;
      margin: auto;
      height: 25%;
      margin: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1.1em;
      font-weight: bold;
      background: var(--gray);

      img {
        width: 20%;
      }
    }
  }
`;

const Top = styled.div`
  width: auto;
  height: auto;

  .top {
    width: 100vw;
    height: 50px;
    padding: 0 10px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .back {
      font-size: 1.3em;
    }

    .settings {
      font-size: 1.6em;
    }
  }
  .bottom {
    width: 100%;
    height: 150px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "one logo two"
      "three three three";

    div {
      width: 95%;
      margin: auto;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .one {
      grid-area: one;
      font-weight: bold;
    }

    .logo {
      grid-area: logo;

      img {
        width: 60%;
        height: 100%;
      }
    }

    .two {
      grid-area: two;
    }

    .three {
      grid-area: three;
      text-align: center;
      padding: 0 10px;
      border-bottom: 1px solid black;

      p {
        span {
          color: var(--bright);
          font-weight: bold;
        }
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default Cart;
