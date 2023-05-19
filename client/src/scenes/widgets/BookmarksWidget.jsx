import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const BookmarksWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(`/users/${userId}/books`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        getPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    username,
                    commId,
                    commName,
                    description,
                    picturePath,
                    likes,
                    bookmarks,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        username={`${username}`}
                        commId={commId}
                        commName={`${commName}`}
                        description={description}
                        picturePath={picturePath}
                        likes={likes}
                        bookmarks={bookmarks}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default BookmarksWidget;