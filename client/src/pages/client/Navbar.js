import { useState } from "react";
import "../../assets/client/css/Navbar.css";
import {
  Apple,
  Heart,
  Menu,
  Plus,
  Search,
  ShoppingCart,
  User,
  Minus,
} from "lucide-react";

const Navbar = () => {
  const [openList, setOpenList] = useState();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleList = () => {
    setOpenList(!openList);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <div className="nav_Main_container">
        {/* logo */}
        <div className="brand">
          <img
            src={require("../../assets/client/image/logo.png")}
            alt="brand"
          />
        </div>

        {/* product */}
        <div className="productList">
          <div className="categories">
            <Menu />
            <p className="text">Categories</p>

            <div className="categories_list">
              <div className="list_item">
                <div className="item_icon">
                  <Apple />
                </div>
                <div className="item_name">
                  <p>Break-fast & Dairy</p>
                </div>
                <div className="item_icon" onClick={handleList}>
                  {openList ? <Minus /> : <Plus />}
                </div>
              </div>

              <div className="list_item">
                <div className="item_icon">
                  <Apple />
                </div>
                <div className="item_name">
                  <p>Break-fast & Dairy</p>
                </div>
              </div>

              <div className="list_item">
                <div className="item_icon">
                  <Apple />
                </div>
                <div className="item_name">
                  <p>Break-fast & Dairy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="search">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search Here Product, Categories, "
            />
            <button>
              <p className="text">Search</p> <Search />
            </button>
          </div>
        </div>

        {/* buttons */}
        <div className="buttons">
          <div className="comp account">
            <User />
            <p>Account</p>
          </div>
          <div className="comp whishlist">
            <Heart />
            <p>Whishlist</p>
            <span className="count">1</span>
          </div>
          <button
            className="comp cart"
            style={{ backgroundColor: "transparent" }}
            onClick={handleCartClick}
          >
            <ShoppingCart />
            <p>My Cart</p>
            <span className="count">1</span>
          </button>
        </div>
      </div>
      {isCartOpen && (
        <div className="cart-drawer">
          <div className="cart-drawer-content">
            <button className="close-btn" onClick={handleCartClick}>
              Close
            </button>
            <h2>Your Cart</h2>
            <div>
              <div>
                <div>
                  <h3>Recent Orders</h3>
                </div>
                <br />

                <table style={{ border: "1px solid grey", width: "90%" }}>
                  <thead>
                    <tr>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Product Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ border: "1px solid dark" }}>
                    {/* {cart.map((item) => (
                      <>
                        <tr key={item.id} style={{ textAlign: "center" }}>
                          <td>
                            <img
                              src={`/uploads/${item.image}`}
                              alt="item banner"
                              width={50}
                            />
                          </td>
                          <td>
                            <p>{item.title}</p>
                          </td>
                          <td>
                            <p>{item.price}</p>
                          </td>
                          <td>
                            <button
                              style={{
                                backgroundColor: "red",
                                padding: "0.8rem 0.5rem",
                                borderRadius: "0.5rem",
                                color: "#fff",
                                cursor: "pointerF",
                              }}
                              // onClick={() => handleRemoveFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      </>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
