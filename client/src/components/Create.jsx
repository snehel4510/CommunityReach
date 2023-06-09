import React from "react";
import {
    Box,
    Button,
    TextField,
    // useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
// import Uploady from "@rpldy/uploady";
// import UploadButton from "@rpldy/upload-button";
// import UploadPreview from "@rpldy/upload-preview";
// import { GlobalStyle } from "Styles/globalStyles";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setComms } from "state";


const CreateSchema = yup.object().shape({
    name: yup.string().min(2).max(20).required("Please Enter the Community Name"),
    about: yup.string().required("Please Enter the Description"),
    picture: yup.string().required("required"),
});


const initialValues = {
    name: "",
    about: "",
    picture: "",
};

const Create = () => {
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    // const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    //     initialValues: initialValues,
    //     validationSchema: CreateSchema,
    //     onSubmit: (values) => {
    //         console.log(values);
    //     },
    // });

    const handleFormSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("name", values.name);
        formData.append("about", values.about);
        formData.append("picture", values.picture);
        formData.append("coverPic", values.picture.name);
        const response = await fetch(`/comms`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const communities = await response.json();
        dispatch(setComms({ communities }));
        onSubmitProps.resetForm();
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={CreateSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    {/* for name of the community */}
                    <Box
                        display="flex"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    >
                        <TextField
                            label="Community Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete="off"
                            name="name"
                            value={values.name}
                            id="communityname"
                            error={
                                Boolean(touched.name) && Boolean(errors.name)
                            }
                            helperText={touched.name && errors.name}
                            sx={{ m: "auto", ridColumn: "span 2" }}
                            size="medium"
                        />
                        {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
                    </Box >

                    {/* for description */}
                    <Box
                        display="flex"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    >
                        <TextField
                            label="Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoComplete="off"
                            name="about"
                            value={values.about}
                            id="communityname"
                            error={
                                Boolean(touched.about) && Boolean(errors.about)
                            }
                            helperText={touched.about && errors.about}
                            sx={{
                                m: "0 auto 0.6rem auto",
                                gridColumn: "span 1"
                            }}
                            size="medium"
                        />
                        {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
                    </Box >
                    {/* the image field */}
                    <Box
                        display="flex"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                                setFieldValue("picture", acceptedFiles[0])
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    display="flex"
                                    alignItems={"center"}
                                    borderRadius="5px"
                                    p="0.8rem"
                                    height={"2.6rem"}
                                    m="auto"
                                    // height={"auto"}
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!values.picture ? (
                                        <p>Add Cover Pic Here</p>
                                    ) : (
                                        <FlexBetween >
                                            <Typography >{values.picture.name}</Typography>
                                            <EditOutlinedIcon />
                                        </FlexBetween>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                    </Box>
                    {/* Submit button */}
                    <Box
                        display="flex"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    >
                        <Button
                            variant="contained" color="success" backgground=""
                            type="submit"
                            sx={{
                                m: "0.8rem 0 0 auto",
                                // m:"auto",
                                p: "0.2rem 0.8rem",
                                fontSize: "0.77rem"
                            }}
                        >
                            Create
                        </Button>
                    </Box>
                </form >
            )}
        </Formik>
    )
};

export default Create;