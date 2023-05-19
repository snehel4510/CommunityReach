import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import CommListWidget from "scenes/widgets/CommListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import BookmarksWidget from "scenes/widgets/BookmarksWidget";

const ProfilePage = ({ books = false }) => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const response = await fetch(`/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

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
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    {/* create a button to view bookmarks  */}
                    {/* <Button size="large" variant="contained" endIcon={<BookmarkBorderOutlinedIcon />}>
                        Click to view Bookmarks
                    </Button>
                    <Box m="2rem 0" /> */}
                    <CommListWidget userId={userId} user={true} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {/* <MyPostWidget picturePath={user.picturePath} /> */}
                    {/* <Box m="2rem 0" />  */}
                    {books ? <BookmarksWidget userId={userId} /> : <PostsWidget Id={userId} isProfile={true} />}
                    {/* <PostsWidget Id={userId} isProfile={true} /> */}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;