import { Box, Typography, useTheme } from "@mui/material";
import Community from "components/Community";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComms } from "state";

const CommListWidget = ({ userId, user = false }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const communities = useSelector((state) => state.user.communities);

    const getComms = async () => {
        const response = await fetch(
            // `/users/${userId}/comms`,
            `/comms`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setComms({ communities: data }));
    };

    const getUserComms = async () => {
        const response = await fetch(
            `/users/${userId}/comms`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setComms({ communities: data }));
    };

    useEffect(() => {
        if (user) getUserComms();
        else getComms();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Community List ({communities.length})
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {communities.map(({ _id, name, coverPic }) => (
                    <Community
                        key={_id}
                        commId={_id}
                        name={`${name}`}
                        coverPic={coverPic}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default CommListWidget;