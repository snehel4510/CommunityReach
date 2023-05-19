import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Member from "components/Member";
import { useState } from "react";

const MemberListWidget = ({ commId }) => {
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        const response = await fetch(
            `/comms/${commId}/members}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setMembers(data);
    };

    useEffect(() => {
        getMembers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Members List ({members.length})
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {members.map(({ _id, name, picturePath }) => (
                    <Member
                        key={_id}
                        userId={_id}
                        name={`${name}`}
                        picturePath={picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default MemberListWidget;