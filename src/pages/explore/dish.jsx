//packages
import * as React from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

//icons
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus, BiArrowBack } from "react-icons/bi";
import { MdOutlineDownloadDone } from "react-icons/md";

//features
import axios from "../../features/axios";

const Product = () => {
  const query = useParams();
  const router = useNavigate();
  const [token, setToken] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [days, setDays] = React.useState([]);
  const [mode, setMode] = React.useState("none");
  const [loading, setLoading] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [toppings, setToppings] = React.useState([]);

  const { isLoading, data } = useQuery("dish", async () => {
    return await axios
      .get(`/dish/${query.product}`, { headers: { auth: `${token}` } })
      .then((res) => {
        setPrice(res.data.data.price);
        return res.data.data;
      });
  });

  const { register, handleSubmit } = useForm();

  const modeRef = React.useRef();

  const deliveryMode = [
    {
      mode: "Pickup from Restaurant",
      price: 0,
    },
    {
      mode: "Eat from Restaurant",
      price: 0,
    },
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const onSubmit = (data) => {
    const { id } = jwtDecode(token);
    if (
      data.timeOfMeal == "none" ||
      data.repeatsInMonth == "none" ||
      amount == 0 ||
      days.length == 0 ||
      mode == "none"
    ) {
      toast.error("Add all details...", {
        toastId: "customId",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      axios
        .post(
          "/admin/cart/add",
          {
            owner: `${id}`,
            quantity: amount,
            timeOfMeal: data.timeOfMeal,
            toppings: toppings,
            daysInWeek: days,
            deliveryMode: mode,
            restaurant: query.restaurant,
            dish: query.product,
            price: price,
          },
          {
            headers: {
              auth: `${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status == "error") {
            toast.error(response.data.message, {
              toastId: "customId",
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          } else {
            setLoading(false);
            setAdded(true);
            toast.success("Product added to cart", {
              toastId: "customId",
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
        });
    }
  };

  const AddTopping = (e, price) => {
    if (!(toppings.map(item => item.name).includes(e.target.value))) {
      setToppings([...toppings, { name: e.target.value, price: price }]);
    } else {
      const newToppings = toppings.filter(topping => topping.name != e.target.value);
      setToppings([...newToppings]);
    }
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    } else {
      setAmount(0);
    }
  };

  const goBack = () => {
    router(-1);
  };

  const goCart = () => {
    router("/explore/cart");
  };

  const handleMode = (e) => {
    setMode(modeRef.current.value);
  };

  const onAddDay = (e) => {
    if (e.target.checked) {
      if (!days.includes(e.target.value)) {
        setDays([...days, e.target.value]);
      }
    } else {
      if (days.includes(e.target.value)) {
        const remaining = days.filter((day) => day != e.target.value);
        setDays([...remaining]);
      }
    }
  };

  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <div>
      <Top onClick={goBack}>
        <BiArrowBack />
      </Top>
      <Image>
        <center>
          <img src={data?.image} alt={data?.name} />
        </center>
      </Image>
      <Content>
        <div className="title">
          <p>{data?.name}</p>
          <p>{price} RWF</p>
        </div>
        <div className="announcement">
          <p>{data?.discount}%</p>
        </div>
        <div className="description">
          <p className="bolder">Decription</p>
          <p className="description_text">{data?.description}</p>
          <div className="amount">
            <p>No. of Ppl/Qty</p>
            <div>
              <div className="plus" onClick={increaseAmount}>
                <AiOutlinePlus />
              </div>
              <p>{amount}</p>
              <div className="minus" onClick={decreaseAmount}>
                <BiMinus />
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="line"></div>
          <div className="toppings">
            <p className="bolder">Additional Top-up</p>
            {data?.toppings?.length > 0 ? (
              <>
                <div className="real">
                  {data?.toppings?.map((topping, index) => (
                    <div className="topping" key={index}>
                      <div>
                        <input
                          type="checkbox"
                          name={topping.name}
                          id={topping.name}
                          value={topping.name}
                          onChange={(e) => AddTopping(e, topping.price)}
                        />
                        <p>
                          {topping.name.length > 7
                            ? `${topping.name.substr(0, 7)}...`
                            : topping.name}
                        </p>
                      </div>
                      <p>{topping.price} RWF</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No additional top-ups</p>
            )}
          </div>
          <div className="line"></div>
          <div className="info">
            <p className="bolder">Booking information</p>
            <div className="real">
              <div className="one">
                <p className="bold">1. What time of meal?</p>
                <select
                  name="time"
                  {...register("timeOfMeal", {
                    required: true,
                  })}
                >
                  <option value="none">None</option>
                  <option value="breakfast">breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div className="two">
                <p className="bold">2. which days in a week?</p>
                <div className="days">
                  {daysOfWeek.map((day, index) => (
                    <div className="day" key={index}>
                      <input
                        type="checkbox"
                        name={day}
                        id={day}
                        value={day}
                        onChange={onAddDay}
                      />
                      <label htmlFor={day}>
                        {day.length > 8 ? `${day.substr(0, 6)}...` : day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="three">
                <p className="bold">3. which delivery mode?</p>
                {deliveryMode.map((mode, index) => (
                  <div className="mode" key={index}>
                    <input
                      type="radio"
                      name="mode"
                      id={mode.mode}
                      value={mode.mode}
                      onChange={(e) => handleMode(e)}
                      ref={modeRef}
                    />
                    <label htmlFor={mode.mode}>{mode.mode}</label>
                  </div>
                ))}
              </div>
              {/* <div className="four">
                <p className="bold">4. How many repeat in a month?</p>
                <select
                  name="time"
                  {...register("repeatsInMonth", {
                    required: true,
                  })}
                >
                  <option value="none">None</option>
                  <option value="1">Just this week</option>
                  <option value="2">Over the next 2 weeks</option>
                  <option value="3">Over the next 3 weeks</option>
                  <option value="4">Over the next 4 weeks</option>
                </select>
              </div> */}
            </div>
          </div>
          <button type="submit" className="add">
            {loading ? (
              <Image src="/loader.svg" alt="loader" width="50" height="50" />
            ) : (
              <div className={added === true ? `added` : `adding`}>
                {added === true ? (
                  <>
                    <MdOutlineDownloadDone />
                    <p>Added to cart</p>
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    <p>Add to cart</p>
                  </>
                )}
              </div>
            )}
          </button>
        </form>
      </Content>
    </div>
  );
};

const Top = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  justify-content: flex-start;
`

const Image = styled.div`
  width: 100%;
  border-radius: 15px;
  height: auto;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const Content = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;

  .bold {
    font-weight: bold;
    text-transform: capitalize;
  }

  .bolder {
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: underline;
  }

  button {
    border: none;
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

    > p {
      width: 70%;
    }

    .amount {
      width: 100px;
      height: 50px;
      position: absolute;
      right: 10px;
      text-align: center;

      p {
        line-height: 20px;
      }

      > div {
        width: 80px;
        height: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        right: 10px;
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
    width: 95%;
    height: 1px;
    margin: 10px 0;
    background: var(--bright);
  }

  form {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .toppings {
    width: 100%;
    height: auto;
    padding: 0 10px 10px 10px;

    .real {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0 10px;
    }

    .topping {
      width: 90%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        width: 60%;
        height: 100%;
        align-items: center;

        p {
          margin: 0 5px;
        }
      }
    }
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
      grid-template-areas:
        "one two"
        "three three";
      grid-gap: 20px;

      .one {
        grid-area: one;
      }

      .two {
        grid-area: two;
      }

      .three {
        grid-area: three;
      }

      select {
        width: 70px;
        height: 20px;
        background: var(--grayish);
        border: none;
        border-radius: 5px;
      }

      .two {
        .days {
          width: 100%;
          height: auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);

          .day {
            width: 21vw;
            height: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
          }
        }
      }
    }
  }

  .add {
    width: 80vw;
    height: 35px;
    margin: 0 0 20px 0;
    display: flex;
    font-weight: bold;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: var(--gray);

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

    .added {
      width: 80vw;
      height: 35px;
      display: flex;
      font-weight: bold;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: turquoise;

      p {
        margin: 0 5px;
      }
    }
  }
`;

export default Product;
