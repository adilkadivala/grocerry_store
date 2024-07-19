import { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchCartItems, removeCartItem } from "../../store/slices/addtoCard";

const Navbar = () => {
  const [openList, setOpenList] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartItems(user.sub));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleList = () => {
    setOpenList(!openList);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeCartItem({ userId: user.sub, itemId }));
    toast.success("Item removed successfully");
  };

  const paymentHandler = async (item) => {
    try {
      const response = await axios.post("http://localhost:6556/order", {
        amount: item.item_price * 100,
        receipt: `receipt#${item.id}`,
      });

      const { id: order_id, amount: order_amount, currency } = response.data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order_amount,
        currency: currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order_id,
        prefill: {
          name: "Your Name",
          email: "youremail@example.com",
          contact: "7284046227",
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error(error.message);
    }
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
          {isAuthenticated ? (
            <button
              style={{ backgroundColor: "transparent" }}
              onClick={() => logout()}
              className="comp account"
            >
              <User />
              <p>Logout</p>
            </button>
          ) : (
            <button
              style={{ backgroundColor: "transparent" }}
              onClick={() => loginWithRedirect()}
              className="comp account"
            >
              <User />
              <p>Login</p>
            </button>
          )}

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
            <span className="count">
              {isAuthenticated ? cartItems.length : 0}
            </span>
          </button>
        </div>
      </div>

      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
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
                  {cartItems.map((item) => (
                    <tr style={{ textAlign: "center" }} key={item.id}>
                      <td>
                        <img
                          src={`/upload/${item.item_img}`}
                          alt="item banner"
                          width={50}
                        />
                      </td>
                      <td>
                        <p>{item.item_title}</p>
                      </td>
                      <td>
                        <p>{item.item_price}</p>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "red",
                            padding: "0.8rem 0.5rem",
                            borderRadius: "0.5rem",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Remove
                        </button>
                        <button
                          style={{
                            backgroundColor: "Blue",
                            padding: "0.8rem 0.5rem",
                            borderRadius: "0.5rem",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={() => paymentHandler(item)}
                        >
                          Buy Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
