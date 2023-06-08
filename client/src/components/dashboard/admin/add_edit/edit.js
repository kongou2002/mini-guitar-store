import React, { useState, useEffect } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import PicUpload from "./upload";
import PicViewer from "./picViewer";
import { errorHelper } from "utils/tools";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import Loader from "utils/loader";
import { useDispatch, useSelector } from "react-redux";
import { validation, formValues, getValuesToEdit } from "./formValues";
import { getAllBrands } from "store/actions/brands.action";
import { productEdit, productsById } from "store/actions/product.action";
import { clearCurrentProducts } from "store/actions/index";

const EditProduct = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const notifications = useSelector((state) => state.notifications);
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(productEdit(values, props.match.params.id));
  };
  const handlePicValue = (pic) => {
    const picArray = formik.values.images;
    picArray.push(pic.url);
    formik.setFieldValue("images", picArray);
  };
  console.log(formik.values);
  const deletePic = (index) => {
    const picArray = formik.values.images;
    picArray.splice(index, 1);
    formik.setFieldValue("images", picArray);
  };
  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);
  // useEffect(() => {
  //     return () => {
  //         dispatch(clearProductsAdd())
  //     }
  // }, [dispatch])
  useEffect(() => {
    const param = props.match.params.id;
    dispatch(getAllBrands());
    if (param) {
      dispatch(productsById(param));
    }
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (products && products.byId) {
      setValues(getValuesToEdit(products.byId));
    }
  }, [products]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentProducts());
    };
  }, [dispatch]);

  return (
    <DashboardLayout title="Edit product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Divider className="mt-3" />
          <PicViewer
            formik={formik}
            deletePicture={(index) => deletePic(index)}
          />
          <PicUpload
            picValue={(pic) => {
              console.log(pic);
              return handlePicValue(pic);
            }}
          />
          <Divider className="mt-3 mb-1" />
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="model"
                label="Enter a model name"
                // variant="outlined"
                {...formik.getFieldProps("model")}
                {...errorHelper(formik, "model")}
              />
            </div>
            <div className="form-group mt-2">
              <TextField
                style={{ width: "100%" }}
                name="frets"
                label="Enter amount of frets"
                // variant="outlined"
                type="number"
                {...formik.getFieldProps("frets")}
                {...errorHelper(formik, "frets")}
              />
            </div>
            <div className="form-group mt-2">
              <TextField
                style={{ width: "100%" }}
                name="woodtype"
                label="Enter woodtype"
                {...formik.getFieldProps("woodtype")}
                {...errorHelper(formik, "woodtype")}
              />
            </div>
            <div className="form-group mt-4">
              <FormControl variant="outlined">
                <h6>Select a brand</h6>
                <Select
                  name="brand"
                  {...formik.getFieldProps("brand")}
                  errors={
                    formik.errors.brand && formik.touched.brand ? true : false
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {brands && brands.all
                    ? brands.all.map((brand) => (
                        <MenuItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {formik.errors.brand && formik.touched.brand ? (
                  <FormHelperText error={true}>
                    {formik.errors.brand}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <div className="form-group mt-4">
              <TextField
                style={{ width: "100%" }}
                name="description"
                label="Enter description"
                variant="outlined"
                {...formik.getFieldProps("description")}
                {...errorHelper(formik, "description")}
                multiline
                rows={4}
              />
            </div>
            <div className="form-group mt-2">
              <TextField
                style={{ width: "100%" }}
                name="price"
                label="Enter price"
                // variant="outlined"
                type="number"
                {...formik.getFieldProps("price")}
                {...errorHelper(formik, "price")}
              />
            </div>
            <div className="form-group mt-2">
              <TextField
                style={{ width: "100%" }}
                name="available"
                label="How many of the items do we have ?"
                // variant="outlined"
                type="number"
                {...formik.getFieldProps("available")}
                {...errorHelper(formik, "available")}
              />
            </div>
            <Divider className="mt-3 mb-3" />
            <div className="form-group mt-4">
              <FormControl variant="outlined">
                <h6>Do we offer free shipping</h6>
                <Select
                  name="shipping"
                  {...formik.getFieldProps("shipping")}
                  errors={
                    formik.errors.shipping && formik.touched.shipping
                      ? true
                      : false
                  }
                >
                  <MenuItem value={true}> Yes</MenuItem>
                  <MenuItem value={false}> Nope</MenuItem>
                </Select>
                {formik.errors.shipping && formik.touched.shipping ? (
                  <FormHelperText error={true}>
                    {formik.errors.shipping}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <Divider className="mt-3 mb-3" />
            <Button variant="contained" color="primary" type="submit">
              Edit
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default EditProduct;
