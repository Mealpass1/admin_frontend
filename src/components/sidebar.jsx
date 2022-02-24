import * as React from "react";

const SideBar = () => {
  return React.ReactDom.createPortal(
    <motion.div
      className="container"
      variants={variants}
      initial="initial"
      animate="visible"
      exit="initial"
    >
      <div className="content">
        <div className="logo">
          <Image src="/logo.svg" alt="logo" width="70" height="70" />
        </div>
        <p>General</p>
        <div className="nav">
          <div
            className={
              router.pathname.includes("diners") ? `$"active"` : `$"item"`
            }
            onClick={handleOrder}
          >
            <FaImage />
            <p>Diners</p>
          </div>
          <div
            className={
              router.pathname.includes("restaurants") ? `$"active"` : `$"item"`
            }
            onClick={handleProduct}
          >
            <FiCodesandbox />
            <p>Restaurants</p>
          </div>
          <div
            className={
              router.pathname.includes("transactions") ? `$"active"` : `$"item"`
            }
            onClick={handleProfile}
          >
            <CgProfile />
            <p>Transactions</p>
          </div>
          <div
            className={
              router.pathname.includes("explore") ? `$"active"` : `$"item"`
            }
            onClick={handleExplore}
          >
            <IoFastFoodSharp />
            <p>Explore</p>
          </div>
        </div>
        <div className="logout">
          <p>Log Out</p>
        </div>
      </div>
      <div className="empty" onClick={() => openBar()}></div>
    </motion.div>,
    document.querySelector("#portal")
  );
};

export default SideBar;
