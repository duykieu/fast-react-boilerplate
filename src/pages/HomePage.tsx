import React from "react";
import { connect } from "react-redux";

import { ReduxThunkDispatch, RootStateType } from "../redux/reducer";
import { IPostsState, PostAction } from "../redux/post";
import { IPost } from "../models/post";

interface IHomePageProps {
    dispatch: ReduxThunkDispatch;
    posts: IPostsState;
    error: any;
}

const HomePage: React.FunctionComponent<IHomePageProps> = ({
    dispatch,
    posts
}) => {
    const fetchPost = () => {
        dispatch(PostAction.clearError());
        dispatch(PostAction.fetch<{}, IPost>({}));
    };

    /**
     * Handle fetch
     */
    React.useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div>
            <h1>Example home page {posts.loading && "..."}</h1>
            {posts.error && <code>{JSON.stringify(posts.error)}</code>}
            <button
                onClick={() => {
                    fetchPost();
                }}
            >
                Reload
            </button>
            <ul>
                {posts.posts.map(post => (
                    <li>
                        <strong>{post.title}</strong>
                        <div>{post.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = ({ posts }: RootStateType) => ({ posts });

export default connect(mapStateToProps)(HomePage);
