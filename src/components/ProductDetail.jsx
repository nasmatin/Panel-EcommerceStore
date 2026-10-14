import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/api";
import DROPDOWN from "./DropDown";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formproduct, setformproduct] = useState({
    productname: "",
    productcat: "",
    productprice: "",
    productnumber: "",
    productdesc: "",
    productuse: "",
  });

  const [error, seterror] = useState("");
  const [imageErrors, setImageErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productimage, setProductimage] = useState([null, null, null, null]);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState("");
const [serverImg, setServerImg] = useState([null, null, null, null]);
console.log("RENDER serverImg:", JSON.stringify(serverImg));

  useEffect(() => {
    console.log("id is:", id);
    fetchCategory();
    async function GetProductDetail(id) {
      setloading(true);
      seterror("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/products/detail/${id}`,
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error("خطا در نمایش جزییات محصول");
        }
        const result = await response.json();
        setformproduct({
          productname: result.name,
          productcat: result.catid,
          productprice: result.price,
          productnumber: result.quantity,
          productdesc: result.description,
          productuse: result.usage,
          img1: "",
          img2: result.img2,
          img3: result.img3,
          img4: result.img4,
        });
console.log("SERVER IMG:", result.img1);

const imgs = [result.img1, result.img2, result.img3, result.img4];
console.log("SETTER CALL:", imgs);

setServerImg(imgs);

      } catch (error) {
        seterror(error.message);
      } finally {
        setloading(false);
      }
    }
    GetProductDetail(id);
  }, [id]);

  const productchange = (e) => {
    const { name, value } = e.target;
    setformproduct((prevdata) => ({ ...prevdata, [name]: value }));
  };
  const validateImage = (file) => {
    if (!file) return "عکسی انتخاب نشده است";

    const maxSize = 200 * 1024; // 100 KB
    const minSize = 20 * 1024; // 20 KB

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return "فرمت عکس باید JPG، PNG  باشد";
    }

    if (file.size > maxSize) {
      return "حجم عکس نباید بیشتر از 200 کیلوبایت باشد";
    }

    if (file.size < minSize) {
      return "حجم عکس نباید کمتر از 20 کیلوبایت باشد";
    }

    return null;
  };
  const ImageChange = (index, file) => {
    const error = validateImage(file);

    // عکس اشتباه است
    if (error) {
      setImageErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = error;
        return newErrors;
      });

      setProductimage((prev) => {
        const newImages = [...prev];
        newImages[index] = null;
        return newImages;
      });

      return;
    }

    // عکس درست است
    setImageErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = "";
      return newErrors;
    });

    setProductimage((prev) => {
      const newImages = [...prev];
      newImages[index] = file;
      return newImages;
    });
  };


  const productedit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < productimage.length; i++) {
      const file = productimage[i];

      if (!file) continue;

      const error = validateImage(file);

      if (error) {
        seterror(`عکس شماره ${i + 1}: ${error}`);
        return;
      }
    }
    UpdateProductDetail(id);
  };
  async function fetchCategory() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/catparents`);
      if (!response.ok) {
        throw new Error(`خطای دریافت دسته‌بندی: ${response.status}`);
      }

      const result = await response.json();
      console.log("Categories:", result);
      const categoryOptions = result.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategories(categoryOptions);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }
  async function UpdateProductDetail(id) {
    setloading(true);
    seterror("");
    try {
      const formData = new FormData();

      formData.append("name", formproduct.productname);
      formData.append("catid", formproduct.productcat);
      formData.append("price", formproduct.productprice);
      formData.append("quantity", formproduct.productnumber);

      formData.append("description", formproduct.productdesc);
      formData.append("usage", formproduct.productuse);

      productimage.forEach((image, index) => {
        if (image) {
          formData.append(`img${index + 1}`, image);
        }
      });
      const response = await fetch(`${API_BASE_URL}/products/edit/${id}`, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "ثبت ناموفق");
      }
      setsuccess("محصول با موفقیت بروز شد");
      navigate("/dashboard/product/productlist");
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }
  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  console.log("formproduct.img1",formproduct.img1)
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {/* <p>ID: {id}</p> */}

      <h2>جزئیات محصولات</h2>
      <form className="form-container" onSubmit={productedit}>
        <label className="lable-container">نام محصول :</label>
        <input
          name="productname"
          className="input"
          value={formproduct.productname}
          required
          onChange={productchange}
        ></input>
        <label className="lable-container">نام دسته :</label>
        <DROPDOWN
          name="Category"
          options={categories}
          value={formproduct.productcat}
          onChange={(value) =>
            setformproduct((prev) => ({ ...prev, productcat: value }))
          }
          placeholder="دسته‌بندی  را انتخاب کنید"
          required
        />
        <label className="lable-container"> قیمت محصول :</label>
        <input
          name="productprice"
          type="number"
          className="input"
          placeholder="قیمت  "
          required
          onChange={productchange}
          min="0"
          value={formproduct.productprice}
        ></input>
        <label className="lable-container"> موجودی محصول :</label>
        <input
          name="productnumber"
          type="number"
          className="input"
          placeholder="موجودی  "
          required
          onChange={productchange}
          min="0"
          value={formproduct.productnumber}
        ></input>
        <div className="textarea-container">
          <label className="lable-container"> توضیحات محصول :</label>
          <textarea
            name="productdesc"
            className="textarea"
            placeholder="توضیحات  "
            required
            value={formproduct.productdesc}
            onChange={productchange}
          ></textarea>
          <label className="lable-container"> نحوه مصرف محصول :</label>
          <textarea
            name="productuse"
            className="textarea"
            placeholder="نحوه نصرف  "
            required
            value={formproduct.productuse}
            onChange={productchange}
          ></textarea>
        </div>

        <div className="product-image">
          <div className="img-upload-container">
            <input
              name="img1"
              type="file"
              accept="image/jpeg,image/png"
              className="button-container"
              onChange={(e) => ImageChange(0, e.target.files[0])}
            />
            {imageErrors[0] && <p className="image-error">{imageErrors[0]}</p>}{" "}
            {(productimage[0] || serverImg[0]) && (
              <img
                src={
                  productimage[0]
                    ? URL.createObjectURL(productimage[0])
                    :serverImg[0]
                }
                className="image-upload"
                alt="product-image-1"
              />
            )}{" "}
            <input
              name="img2"
              type="file"
              accept="image/jpeg,image/png"
              className="button-container"
              onChange={(e) => ImageChange(1, e.target.files[0])}
            />
   
            {imageErrors[1] && <p className="image-error">{imageErrors[1]}</p>}{" "}
            {(productimage[1] || serverImg[1]) && (
              <img
                src={
                  productimage[1]
                    ? URL.createObjectURL(productimage[1])
                    :serverImg[1]
            
                }
                className="image-upload"
                alt="product-image-2"
              />
            )}
          </div>
          <div className="img-upload-container">
            <input
              name="img3"
              type="file"
              accept="image/jpeg,image/png"
              className="button-container"
              onChange={(e) => ImageChange(2, e.target.files[0])}
            />
            {imageErrors[2] && <p className="image-error">{imageErrors[2]}</p>}{" "}
            {(productimage[2] || serverImg[2]) && (
              <img
                src={
                  productimage[2]
                    ? URL.createObjectURL(productimage[2])
                    : serverImg[2]
                }
                className="image-upload"
                alt="product-image-1"
              />
            )}
            <input
              name="img4"
              type="file"
              accept="image/jpeg,image/png"
              className="button-container"
              onChange={(e) => ImageChange(3, e.target.files[0])}
            />
            {imageErrors[3] && <p className="image-error">{imageErrors[3]}</p>}{" "}
            {(productimage[3] || serverImg[3]) && (
              <img
                src={
                  productimage[3]
                    ? URL.createObjectURL(productimage[3])
                    : serverImg[3]
                }
                className="image-upload"
                alt="product-image-4"
              />
            )}{" "}
          </div>
        </div>
        <div>
          <button type="submit" className="button-container" disabled={loading}>
            {loading ? "در حال بروزرسانی محصول..." : " بروزرسانی"}
          </button>
        </div>
      </form>{" "}
    </div>
  );
}

export default ProductDetail;
