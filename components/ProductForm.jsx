import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux";
import { toast } from "react-toastify";
import { FaImage, FaTrash } from "react-icons/fa";

import styles from "../styles/productForm.module.css";

const ProductForm = ({product}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({
    id: product ? product?._id : undefined,
    name: product ? product?.name : "",
    description: product ? product?.description : "",
    brand: product ? product?.brand : "",
    price: product ? product?.price : "",
    category: product ? product?.category : "electronics",
    quantity: product ? product?.quantity : 1,
    gender: product ? product?.gender : "unisex",
    size: product ? product?.size : undefined,
    image: product ? product?.image : "",
  });

  const [productImg, setProductImg] = useState(product ? product?.image : "");

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const onImageChange = (e) => {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      setProductDetails({ ...productDetails, image: e.target.files[0] });
      setProductImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onRemove = (e) => {
    e.preventDefault();
    setProductDetails({ ...productDetails, image: "" });
    setProductImg("");
  };

  const onDeleteProduct = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.deleteProduct(profuct?._id));
    router.replace("/seller/store");
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {
      name,
      description,
      brand,
      price,
      category,
      quantity,
      gender,
      size,
    } = productDetails;

    if (
      name.length >= 3 &&
      name.length <= 25 &&
      description.length >= 5 &&
      description.length <= 100 &&
      brand.trim().length > 0 &&
      parseInt(price) > 0 &&
      ["electronics", "eyeware", "books", "clothing"].indexOf(category) !==
        -1 &&
      quantity >= 1 &&
      ["men", "women", "unisex"].indexOf(gender) !== -1 &&
      (!size || (size && ["xs", "s", "m", "l", "xl", "xxl", "free"].indexOf(size) !== -1))
    ) {
      if(product) {
        dispatch(actionCreators.editProduct(productDetails));
      }
      else {
        dispatch(actionCreators.addProduct(productDetails));
      }
      router.back();
    } else {
      if (name.length < 3 || name.length > 25) {
        toast.warn("Name should be of minimum 3 and maximum 25 characters!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (description.length < 5 || description.length > 100) {
        toast.warn(
          "Description should be of minimum 5 and maximum 100 characters!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else if (brand.trim().length < 0) {
        toast.warn("Brand cannot be empty!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (parseInt(price) <= 0) {
        toast.warn("Price cannot be empty and must be greater than 0!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (
        ["electronics", "eyeware", "books", "clothing"].indexOf(category) === -1
      ) {
        toast.warn(
          "Category cannot be other than electronics,eyewear,books,clothing!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else if (["men", "women", "unisex"].indexOf(gender) === -1) {
        toast.warn("Gender cannot be other than men,women,unisex!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (quantity < 1) {
        toast.warn("Quantity must be minimum 1!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn("Size cannot be other than xs,s,m,l,xl,xxl,free!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className={styles.productForm}>
      <form className={styles.product_form_div} onSubmit={onSubmitHandler}>
        <div className={styles.pair_div}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className={styles.img_input}
            placeholder="Product Image"
            onChange={onImageChange}
          />
          <div
            className={styles.image_preview}
            style={{
              border:
                productImg !== ""
                  ? "0.1rem solid limegreen"
                  : "0.1rem solid lightgrey",
            }}
          >
            {productImg !== "" && (
              <FaTrash
                className={styles.remove_image_icon}
                onClick={onRemove}
              />
            )}
            {productImg !== "" ? (
              <Image src={productImg} alt="product" layout="fill" />
            ) : (
              <label htmlFor="image">
                <FaImage className={styles.image_icon} />
              </label>
            )}
          </div>
        </div>

        <div className={styles.pair_div}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            value={productDetails.name}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.pair_div}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Product Description"
            value={productDetails.description}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.pair_div}>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="Brand"
            value={productDetails.brand}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.pair_div}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Product Price"
            value={productDetails.price}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.pair_div}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={productDetails.category}
            onChange={onChangeHandler}
          >
            <option value="electronics">Electronics</option>
            <option value="eyewear">Eyewear</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>

        <div className={styles.pair_div}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Product Quantity"
            value={productDetails.quantity}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.pair_div}>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={productDetails.gender}
            onChange={onChangeHandler}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {productDetails.category === "clothing" && (
          <div className={styles.pair_div}>
            <label htmlFor="size">Size</label>
            <select
              name="size"
              id="size"
              value={productDetails.size}
              onChange={onChangeHandler}
            >
              <option value="xs">xs</option>
              <option value="s">s</option>
              <option value="m">m</option>
              <option value="l">l</option>
              <option value="xl">xl</option>
              <option value="xxl">xxl</option>
              <option value="free">free</option>
            </select>
          </div>
        )}

        <div className={styles.btn_div}>
          <button className={styles.submit_btn}>Submit</button>
          {product && <button className={styles.product_delete_btn} onClick={onDeleteProduct}>Delete</button>}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
