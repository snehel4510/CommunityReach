import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    // GifBoxOutlined,
    ImageOutlined,
    // MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [desc, setDesc] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const [commName, setCommName] = useState("");

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", desc);
        formData.append("comName", commName);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        const response = await fetch(`/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setDesc("");
        setIsImage(false);
        setCommName("");
    };

    const communities = useSelector((state) => state.user.communities);
    // map through the names of the communities and display them in the dropdown menu
    const commList = communities.map((comm) => {
        return (
            <MenuItem key={comm._id} value={comm.name}>{comm.name}</MenuItem>
        )
    })

    const handleChange = (e) => {
        setCommName(e.target.value);
        console.log(commName);
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="Ask something..."
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
                {/* <InputBase
                    placeholder="Which community?.."
                    onChange={(e) => setComm(e.target.value)}
                    value={comm}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                /> */}
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Community</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={commName}
                            label="Community"
                            onChange={handleChange}
                        >
                            {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                            {commList}

                        </Select>
                    </FormControl>
                </Box>

            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                        {/* <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween> */}

                        {/* <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween> */}

                        {/* <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween> */}
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!desc || !commName}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;