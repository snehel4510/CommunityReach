import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Member = ({ userId, name, picturePath }) => {

    const navigate = useNavigate();
    const { palette } = useTheme();
    const main = palette.neutral.main;


    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={picturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${userId}`);
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
                </Box>
            </FlexBetween>
            {/* <IconButton
                onClick={() => patchComm()}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
                {isComm ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton> */}
        </FlexBetween>
    );
};

export default Member;