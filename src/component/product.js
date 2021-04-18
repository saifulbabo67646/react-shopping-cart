import React, { useState, useEffect } from "react";
import formatCurrency from "./util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";

const Product = ({ addToCart }) => {
  const [isOpenModal, setModalOpen] = useState(null);

  const allProducts = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openModal = (product) => {
    setModalOpen(product);
  };
  const closeModal = () => {
    setModalOpen(null);
  };
  return (
    <div>
      <Fade bottom cascade>
        {!allProducts ? (
          <div>Loading....</div>
        ) : (
          <ul className="products">
            {allProducts.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => addToCart(product)}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
      {isOpenModal && (
        <Modal isOpen={true} onRequestClose={closeModal} key={isOpenModal._id}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="product-details">
              <img src={isOpenModal.image} alt={isOpenModal.title}></img>
              <div className="product-details-description">
                <p>
                  <strong>{isOpenModal.title}</strong>
                </p>
                <p>{isOpenModal.description}</p>
                <p>
                  Available Sizes:{" "}
                  {isOpenModal.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <buton className="button">{x}</buton>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>
                    {formatCurrency(isOpenModal.price)}
                    <button
                      className="button primary"
                      onClick={() => {
                        addToCart(isOpenModal);
                        closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Product;
