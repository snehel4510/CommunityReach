import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import PostsWidget from "scenes/widgets/PostsWidget";
import MemberListWidget from "scenes/widgets/MemberListWidget";

const CommPage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const [comm, setComm] = useState(null);
    const { commId } = useParams();
    const token = useSelector((state) => state.token);
    const getComm = async () => {
        const response = await fetch(`/comms/${commId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setComm(data);
    };

    useEffect(() => {
        getComm();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!comm) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    {/* <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" /> */}
                    <MemberListWidget commId={commId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {/* <MyPostWidget picturePath={user.picturePath} /> */}
                    {/* <Box m="2rem 0" />  */}
                    <PostsWidget Id={commId} isProfile={true} />
                </Box>
            </Box>
        </Box>
    );

};
export default CommPage;