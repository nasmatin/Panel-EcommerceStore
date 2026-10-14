import {useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/api.jsx";
import DROPDOWN from "../../components/DropDown";
function AddProduct() {
  const navigate = useNavigate();

  const [formproduct, setformproduct] = useState({
    productname: "",
    productcat: "",
    productprice: "",
    productnumber: "",
    productdesc: "",
    productuse: "",
  });

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [imageErrors, setImageErrors] = useState([]);
  const [success, setsuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [productimage, setProductimage] = useState([
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const productchange = (e) => {
    const { name, value } = e.target;

    setformproduct((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const validateImage = (file) => {
    if (!file) return "عکسی انتخاب نشده است";

    const maxSize = 200 * 1024; // 100 KB
    const minSize = 20 * 1024;  // 20 KB

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      
    ];

    if (!allowedTypes.includes(file.type)) {
      return "فرمت عکس باید JPG، PNG   باشد";
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

  const productsubmit = async (e) => {
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

    setloading(true);
    seterror("");
    setsuccess("");

    try {
      const formData = new FormData();

      formData.append("name", formproduct.productname);
      formData.append("catid", selectedValue);
      formData.append("price", formproduct.productprice);
      formData.append("quantity", formproduct.productnumber);
      formData.append("description", formproduct.productdesc);
      formData.append("usage", formproduct.productuse);

      productimage.forEach((image, index) => {
        if (image) {
          formData.append(`img${index + 1}`, image);
        }
      });

      const response = await fetch(
        `${API_BASE_URL}/products/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "ثبت ناموفق");
      }

      setsuccess("محصول با موفقیت ثبت شد");

      setTimeout(() => {
        navigate("/dashboard/product/productlist");
      }, 1000);

    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };

  async function fetchCategory() {
    setloading(true);
    seterror("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/catparents`
      );

      if (!response.ok) {
        throw new Error(
          `خطای دریافت دسته‌بندی: ${response.status}`
        );
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

  return (
    <>
      <div className="header-dashboard">
        <h2>ثبت محصول :</h2>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>

      <form
        className="form-container"
        onSubmit={productsubmit}
      >
        <label className="lable-container">
          نام محصول :
        </label>

        <input
          name="productname"
          className="input"
          placeholder="نام محصول"
          required
          onChange={productchange}
        />

        <label className="lable-container">
          نام دسته :
        </label>

        <DROPDOWN
          name="Category"
          options={categories}
          value={selectedValue}
          onChange={setSelectedValue}
          placeholder="دسته‌بندی را انتخاب کنید"
          required
        />

        <label className="lable-container">
          قیمت محصول :
        </label>

        <input
          name="productprice"
          type="number"
          className="input"
          placeholder="قیمت"
          required
          onChange={productchange}
          min="0"
        />

        <label className="lable-container">
          موجودی محصول :
        </label>

        <input
          name="productnumber"
          type="number"
          className="input"
          placeholder="موجودی"
          required
          onChange={productchange}
          min="0"
        />

        <div className="textarea-container">
          <label className="lable-container">
            توضیحات محصول :
          </label>

          <textarea
            name="productdesc"
            className="textarea"
            placeholder="توضیحات"
            required
            onChange={productchange}
          />

          <label className="lable-container">
            نحوه مصرف محصول :
          </label>

          <textarea
            name="productuse"
            className="textarea"
            placeholder="نحوه مصرف"
            required
            onChange={productchange}
          />
        </div>

        <div className="product-image">

          <div className="img-upload-container">

            <input
              name="img1"
              type="file"
              accept="image/jpeg,image/png"
              className="button-container"
              onChange={(e) =>
                ImageChange(0, e.target.files[0])
              }
              required
            />

            {imageErrors[0] && (
              <p className="image-error">
                {imageErrors[0]}
              </p>
            )}

            {productimage[0] && (
              <img
                src={URL.createObjectURL(productimage[0])}
                className="image-upload"
                alt="product-image-1"
              />
            )}

            <input
              name="img2"
              type="file"
              accept="image/jpeg,image/png"
              className="button-container"
              onChange={(e) =>
                ImageChange(1, e.target.files[0])
              }
            />

            {imageErrors[1] && (
              <p className="image-error">
                {imageErrors[1]}
              </p>
            )}

            {productimage[1] && (
              <img
                src={URL.createObjectURL(productimage[1])}
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
              onChange={(e) =>
                ImageChange(2, e.target.files[0])
              }
            />

            {imageErrors[2] && (
              <p className="image-error">
                {imageErrors[2]}
              </p>
            )}

            {productimage[2] && (
              <img
                src={URL.createObjectURL(productimage[2])}
                className="image-upload"
                alt="product-image-3"
              />
            )}

            <input
              name="img4"
              type="file"
              accept="image/jpeg,image/png"
              className="button-container"
              onChange={(e) =>
                ImageChange(3, e.target.files[0])
              }
            />

            {imageErrors[3] && (
              <p className="image-error">
                {imageErrors[3]}
              </p>
            )}

            {productimage[3] && (
              <img
                src={URL.createObjectURL(productimage[3])}
                className="image-upload"
                alt="product-image-4"
              />
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="button-container"
            disabled={loading}
          >
            {loading
              ? "در حال ثبت محصول..."
              : "ثبت محصول"}
          </button>

          {success && (
            <p style={{ color: "green" }}>
              {success}
            </p>
          )}
        </div>
      </form>
    </>
  );
}

export default AddProduct;