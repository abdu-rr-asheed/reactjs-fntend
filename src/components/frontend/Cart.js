import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Cart = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  if (!localStorage.getItem("auth_token")) {
    history.push("/login");
    swal("Warning", "Login ti goto Add to Cart", "error");
  }

  useEffect(() => {
    let isMountered = true;

    axios.get(`/api/cart`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          history.push("/collection");
          swal("Warning 404", res.data.message, "warning");
        }
      }
    });

    return () => {
      isMountered = false;
    };
  }, [history]);

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };

  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty:
                item.product_qty +
                (item.product_qty < item.product.quantity ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };

  function updateCartQuantity(cart_id, scope) {
    axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
        // swal("Success", res.data.message, "success");
      }
    });
  }

  const daleteCartItem = (e, cart_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";
    thisClicked.disabled = true;

    axios.delete(`/api/delete-cartitem/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Remove";
        thisClicked.disabled = false;
      }
    });
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={`https://frozen-plains-70593.herokuapp.com/${item.product.image}`}
                      alt={item.product.name}
                      width="80px"
                    />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.product.selling_price}</td>
                  <td>
                    <div className="input-group">
                      <button
                        type="button"
                        onClick={() => handleDecrement(item.id)}
                        className="input-group-text"
                      >
                        -
                      </button>
                      <div className="form-control text-center">
                        {item.product_qty}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleIncrement(item.id)}
                        className="input-group-text"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{item.product.selling_price * item.product_qty}</td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => daleteCartItem(e, item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    cart_HTML = (
      <div className="table-responsive">
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Shopping Cart is Empty</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <h1>Collection | Cart</h1>
      </div>
      <div className="row">
        <div className="col-md-12">{cart_HTML}</div>
      </div>
    </div>
  );
};

export default Cart;
