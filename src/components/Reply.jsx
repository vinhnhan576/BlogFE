import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createNewComment,
    getAllCommentsByBlogAsync,
} from '../features/comment/commentSlice';
import alt from '../assets/image/user/alt.png';

const Reply = ({
    blogID,
    userID,
    isHeadComment,
    parentID,
    setShowReplies,
    setNewReply,
}) => {
    const dispatch = useDispatch();
    const textareaRef = useRef();
    const [context, setContext] = useState('');
    const user = useSelector((state) => state.user);

    const makeNewComment = async () => {
        if (context) {
            await dispatch(
                createNewComment({
                    context: context,
                    parentID: parentID,
                    blogID: blogID,
                    userID: userID,
                })
            );
            await dispatch(getAllCommentsByBlogAsync(blogID));
            !isHeadComment && setShowReplies(true);
            !isHeadComment && setNewReply(false);
            textareaRef.current.value = '';
        }
    };

    return (
        <div className="reply">
            {/* {!isHeadComment && <div className="reply__connect-line"></div>} */}
            <div className={`reply__container ${isHeadComment ? 'head' : ''}`}>
                <div className={`reply__pfp ${isHeadComment ? 'head' : ''}`}>
                    {user?.profilepic !== '' &&
                    user?.profilepic !== undefined ? (
                        <img
                            src={'data:image/jpg;base64,' + user?.profilepic}
                            alt={alt}
                        />
                    ) : (
                        <img src={alt} alt={alt} />
                    )}
                </div>
                <div className="reply__comment-area">
                    <textarea
                        type="text"
                        name="content"
                        className="reply__input"
                        placeholder="Leave a comment"
                        ref={textareaRef}
                        onChange={(e) => setContext(e.target.value)}
                        onBlur={(e) => {
                            if (e.target.value === '') {
                                textareaRef.current.style.height = '45px';
                                
                            }
                        }}
                        onFocus={(e) => {
                            if (e.target.value === '')
                                textareaRef.current.style.height = '60px';
                        }}
                        onInput={(e) => {
                            // textareaRef.current.style.height = '60px';
                            let height = e.target.scrollHeight;
                            if (height > 45 && e.target.value !== '') {
                                // textareaRef.current.style.height = "auto";
                                textareaRef.current.style.height = `${height}px`;
                            }
                        }}
                    ></textarea>
                    <div
                        className="reply__post-button"
                        onClick={makeNewComment}
                    >
                        <i className="bx bxs-send"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reply;
