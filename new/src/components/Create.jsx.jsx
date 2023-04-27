import React from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
// import Uploady from "@rpldy/uploady";
// import UploadButton from "@rpldy/upload-button";
// import UploadPreview from "@rpldy/upload-preview";
// import { GlobalStyle } from "Styles/globalStyles";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";



const CreateSchema = yup.object({
    name: yup.string().min(2).max(20).required("Please Enter the Community Name"),
    email: yup.string().email("invalid email").required("required"),
    description: yup.string().required("Please Enter the Description"),
});


const initialValues = {
    name: "",
    email: "",
    description: "",
    picture: "",

};

const Create = () => {
    const { palette } = useTheme();

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: CreateSchema,
        onSubmit: (values) => {
            console.log(

                values
            );
        },
    });

    return (

        <form onSubmit={handleSubmit}>
            <Box
                display="flex"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
                {/* for name of the community */}
                <TextField
                    label=" Name of the community"
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
                    sx={{ m:"auto",ridColumn: "span 2" }}
                    size="small"
                />
                {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </Box >
            {/* for email of creater*/}
            <Box
                display="flex"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
                {/* for name of the community */}
                <TextField

                    label="Your Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                    name="email"
                    value={values.email}
                    id="communityname"
                    error={
                        Boolean(touched.email) && Boolean(errors.email)
                    }
                    helperText={touched.email && errors.email}
                    sx={{
                        m: "0.6rem auto",
                        // m:"auto",
                        gridColumn: "span 2"
                    }}
                    size="small"
                />
                {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </Box >
            {/* for description */}
            <Box
                display="flex"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
                {/* for description of the community */}
                <TextField
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                    name="description"
                    value={values.description}
                    id="communityname"
                    error={
                        Boolean(touched.description) && Boolean(errors.description)
                    }
                    helperText={touched.description && errors.description}
                    sx={{
                        m: "0 auto 0.6rem auto",
                        gridColumn: "span 1"
                    }}
                    size="small"
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
                                <p>Add Picture Here</p>
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



    )
};

export default Create;