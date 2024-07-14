import React, { useState, useEffect } from "react";
import "../../assets/admin/css/main.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getItemData } from "../../store/slices/item";
import Navbar from "../../layouts/admin/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../layouts/admin/Sidebar";
import { DeleteModal } from "../../layouts/admin/Modal";

const Main = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item);
  const [loading, setLoading] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [itemId, setItemId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    item_img: null,
    item_title: "",
    item_weight: "",
    item_price: "",
  });

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // insert and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData();
    formdata.append("item_weight", formData.item_weight);
    formdata.append("item_title", formData.item_title);
    formdata.append("item_price", formData.item_price);
    formdata.append("item_img", formData.item_img);

    try {
      const url = isUpdateMode
        ? `http://localhost:6556/updateitem/${formData.id}`
        : "http://localhost:6556/postitem";
      const method = isUpdateMode ? "put" : "post";
      const response = await axios[method](url, formdata);

      if (response.status === 200) {
        dispatch(getItemData());
        setFormData({
          item_img: null,
          item_title: "",
          item_weight: "",
          item_price: "",
        });
        toast.success(
          isUpdateMode ? "Updated successfully" : "Inserted successfully"
        );
        setIsUpdateMode(false);
        setLoading(false);
      } else {
        throw new Error("Error in form submission");
      }
    } catch (error) {
      toast.error("Error in form submission");
      console.error("Error in form submission", error);
      setLoading(false);
    }
  };

  // Input change handler
  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // open update modal

  const openUpdateModal = (item) => {
    setIsUpdateMode(true);
    setFormData({
      id: item.id,
      item_title: item.item_title,
      item_weight: item.item_weight,
      item_price: item.item_price,
      item_img: item.item_img,
    });
  };

  // Open delete modal
  const openDeleteModal = (itemId) => {
    setDeleteModalOpen(true);
    setItemId(itemId);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setItemId(null);
  };

  const deleteItems = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:6556/deleteitem/${itemId}`
      );
      if (response.status === 200) {
        dispatch(getItemData());
        closeDeleteModal();
        toast.success("Deleted successfully");
      } else {
        throw new Error("Error in deleting item");
      }
    } catch (error) {
      toast.error("Error in deleting item");
      console.error("Error in deleting item", error);
    }
  };

  useEffect(() => {
    dispatch(getItemData());

    const handleResize = () => {
      setSidebarHidden(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <>
      <Sidebar isOpen={!sidebarHidden} />
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onCloseDelete={closeDeleteModal}
        onDelete={deleteItems}
        itemId={itemId}
      />

      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <Link href="#">Dashboard</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <Link className="active" href="#">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="#" className="btn-download">
              <i className="bx bxs-cloud-download"></i>
              <span className="text">Download PDF</span>
            </Link>
          </div>

          <ul className="box-info">
            <li>
              <i className="bx bxs-calendar-check"></i>
              <span className="text">
                <h3>1020</h3>
                <p>New Order</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group"></i>
              <span className="text">
                <h3>2834</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Item Image</th>
                    <th>Item Title</th>
                    <th>Item Weight</th>
                    <th>Item Price</th>
                    <th>Actios</th>
                  </tr>
                </thead>
                <tbody>
                  {item.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={`/upload/${item.item_img}`} alt="user" />
                      </td>
                      <td>{item.item_title}</td>
                      <td>{item.item_weight}</td>
                      <td>{item.item_price}</td>

                      <td
                        style={{
                          display: "flex",
                          gap: "2rem",
                        }}
                      >
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() => openDeleteModal(item.id)}
                        >
                          <i class="bx bxs-trash"></i>
                        </button>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() => openUpdateModal(item)}
                        >
                          <i class="bx bx-edit-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>{isUpdateMode ? "Update Data" : "New data"}</h3>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="item_img" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      id="item_img"
                      onChange={handleInput}
                      name="item_img"
                      disabled={loading}
                    />
                    {formData.image && isUpdateMode && (
                      <img src={`/upload/${formData.image}`} alt="current" />
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="item_title" className="form-label">
                      Item Title
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={formData.item_title}
                      id="item_title"
                      onChange={handleInput}
                      name="item_title"
                      placeholder="Fresh Mango"
                      disabled={loading}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="item_weight" className="form-label">
                      Item Weight
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="number"
                      className="form-control"
                      value={formData.item_weight}
                      id="item_weight"
                      onChange={handleInput}
                      name="item_weight"
                      placeholder="Ex: 25g"
                      disabled={loading}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="item_price" className="form-label">
                      Item Price
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="number"
                      className="form-control"
                      value={formData.item_price}
                      id="item_price"
                      onChange={handleInput}
                      name="item_price"
                      placeholder="Ex: 2$"
                      disabled={loading}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#FD7238",
                        border: "none",
                        color: "#FFF",
                        marginRight: "5px",
                        padding: "7px 10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                      onClick={() => setIsUpdateMode(false)}
                      disabled={loading}
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#52a01f",
                        border: "none",
                        color: "#FFF",
                        cursor: "pointer",
                        marginLeft: "5px",
                        padding: "7px 10px",
                        borderRadius: "5px",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Main;
