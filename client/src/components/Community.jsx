import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setComms } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useState } from "react";

const Community = ({ commId, name, coverPic }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // const communities = useSelector((state) => state.user.communities);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    // const medium = palette.neutral.medium;


    // const getComms = async () => {
    //     const response = await fetch(
    //         `/users/${_id}/comms`,
    //         // `/comms`,
    //         {
    //             method: "GET",
    //             headers: { Authorization: `Bearer ${token}` },
    //         }
    //     );
    //     const data = await response.json();
    //     dispatch(setComms({ communities: data }));
    // };

    // useEffect(() => {
    //     getComms();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const [isComm, setIsComm] = useState(false);

    const checkComm = async () => {
        const response = await fetch(
            `/users/${_id}/${commId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setIsComm(data);
    };

    checkComm();

    const patchComm = async () => {
        const response = await fetch(
            `/users/${_id}/${commId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setComms({ communities: data }));
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={coverPic} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/community/${commId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    {/* <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography> */}
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchComm()}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
                {isComm ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Community;