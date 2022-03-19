//packages
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineDownloadDone } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

import axios from "../../../features/axios";

const CartItem = () => {
  const query = useParams();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [token, setToken] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState([]);
  const [mode, setMode] = useState("");

  const { isLoading, data } = useQuery("cartItem", async () => {
    return await axios
      .get(`admin/cart/${query.id}`, { headers: { auth: `${token}` } })
      .then((res) => {
        setTime(res.data.data.timeOfMeal);
        setDays(res.data.data.daysInWeek);
        setMode(res.data.data.deliveryMode);
        return res.data;
      });
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const deliveryMode = ["Eat from Restaurant", "Pickup from Restaurant"];

  const updateCart = () => {
    console.log("update cart");
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const onAddDay = () => {
    console.log("add day");
  };

  const handleMode = (e) => {
    setMode(e.target.value);
  };

  const goBack = () => {
    router(-1);
  };

  const goCart = () => {
    router(-1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <Layout>
      <Top>
        <div className="icons">
          <div className="back" onClick={goBack}>
            <IoArrowBackOutline />
          </div>
          <div className="cart" onClick={goCart}>
            <FaShoppingCart />
          </div>
        </div>
      </Top>
      <Image>
        <img src={data?.data?.dish?.image} alt={data?.data?.dish?.name} />
      </Image>
      <Container onSubmit={updateCart}>
        <div className="content">
          <div className="title">
            <p>{data?.data?.dish?.name}</p>
            <p>{data?.data?.dish?.price} RWF</p>
          </div>
          <div className="announcement">
            <p>({data?.data?.dish?.discount}%Off)</p>
          </div>

          <div className="description">
            <p className="bolder">Decription</p>
            <p className="description_text">{data?.data?.dish?.description}</p>
            <div className="amount">
              Total Meal Serving = <span>{data?.data?.mealServing}</span>
            </div>
          </div>
          <div className="line"></div>
          <div className="info">
            <p className="bolder">More information</p>
            <div className="real">
              <div className="one">
                <p className="bold">1. What time of meal?</p>
                <select
                  name="time"
                  onChange={handleTime}
                  defaultValue={`${time}`}
                >
                  <option value="breakfast">breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div className="two">
                <p className="bold">2. which days in a week?</p>
                <div className="days">
                  {days?.map((one, index) => (
                    <div className="row" key={index}>
                      <div className="day">
                        <input
                          type="checkbox"
                          name={one}
                          id={one}
                          value={one}
                          onChange={onAddDay}
                          checked
                        />
                        <label htmlFor={one}>{one}</label>
                      </div>
                      <div className="change">
                        <select name="days" id="days">
                          <option value="none">change</option>
                          {daysOfWeek.map((day, index) => (
                            <React.Fragment>
                              {day === one ? (
                                <React.Fragment></React.Fragment>
                              ) : (
                                <>
                                  <option value={day} key={index}>
                                    {day}
                                  </option>
                                </>
                              )}
                            </React.Fragment>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="three">
                <p className="bold">3. which delivery mode?</p>
                {deliveryMode.map((one, index) => (
                  <div className="mode" key={index}>
                    <input
                      type="radio"
                      name="mode"
                      id={one}
                      value={one}
                      onChange={handleMode}
                      checked={mode == one ? true : false}
                    />
                    <label htmlFor={one}>{one}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button type="button" className="add" onClick={updateCart}>
            {loading ? (
              <img src="/loader.svg" alt="loader" />
            ) : (
              <div className={updated == true ? `added` : `adding`}>
                {updated == true ? (
                  <>
                    <MdOutlineDownloadDone />
                    <p>Updated</p>
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    <p>Update</p>
                  </>
                )}
              </div>
            )}
          </button>
        </div>
      </Container>
    </Layout>
  );
};

const Layout = styled.div`
  width: auto;
  height: auto;
  margin: 0 0 20px 0;
`;

const Top = styled.div`
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 40px;

  .icons {
    width: 90%;
    height: 40px;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 1;

    .back {
      font-size: 1.8em;
      color: var(--black);
    }

    .cart {
      width: 20px;
      height: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      font-size: 1.5em;
    }
  }
`;

const Image = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;

  img {
    width: 100%;
  }
`;
const Container = styled.form`
  .content {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    button {
      border: none;
    }

    .bold {
      font-weight: bold;
      text-transform: capitalize;
    }

    .bolder {
      font-weight: bold;
      text-transform: capitalize;
      text-decoration: underline;
    }

    .title {
      width: 100%;
      height: 25px;
      text-transform: capitalize;
      padding: 0 10px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .announcement {
      width: 100%;
      height: 20px;
      color: var(--red);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .description {
      width: 100%;
      height: 60px;
      position: relative;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      .amount {
        width: 150px;
        height: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        right: 10px;

        span {
          padding: 5px;
          background: var(--gray);
        }

        .plus,
        .minus {
          width: 30%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0px 0.5px 3px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--grayish);
        }
      }
    }

    .line {
      width: 90%;
      height: 1px;
      margin: 10px 0;
      background: var(--bright);
    }

    .items {
      width: 100%;
      height: auto;
      padding: 0 10px;
    }

    .info {
      width: 100%;
      height: auto;
      padding: 0 10px;

      .real {
        width: 100%;
        height: auto;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;

        .item {
          width: 35vw;
          height: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }

        select {
          width: 70px;
          height: 20px;
          background: var(--grayish);
          border: none;
          border-radius: 5px;
        }

        .two .days {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;

          .row {
            width: 100%;
            height: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }

    .add,
    .added,
    .adding {
      width: 80vw;
      height: 35px;
      display: flex;
      font-weight: bold;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: var(--gray);
    }
  }
`;

export default CartItem;
