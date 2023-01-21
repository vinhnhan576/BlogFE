import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateBlogAsync } from '../features/post/blogSlice';
import { getUserByUsernameAsync } from '../features/user/userSlice';

const MessageBox = ({
    _id,
    title,
    body,
    blogName,
    slug,
    alias,
    onCheckButtonClick,
    onCloseButtonClick,
    functionType,
}) => {
    const dispatch = useDispatch();
    const username = JSON.parse(localStorage.getItem('user'))?.account.username;

    const publishBlog = async () => {
        console.log('publishing...');
        await dispatch(
            updateBlogAsync({ blogReqData: { _id: _id, published: true } })
        );
		await dispatch(getUserByUsernameAsync({ username: username }));
		onCloseButtonClick();
    };

    const unpublishBlog = async () => {
        await dispatch(
            updateBlogAsync({ blogReqData: { _id: _id, published: false } })
        );
		await dispatch(getUserByUsernameAsync({ username: username }));
		onCloseButtonClick();
    };

    return (
        <div className="message-box">
            <div className="message-box__container">
                <div className="message-box__icon">
                    <i className="bx bxs-message-alt-error"></i>
                </div>
                <div className="message-box__content">
                    <div className="message-box__content__title">{title}</div>
                    <div className="message-box__content__body">
                        {body} "{blogName}"
                    </div>
                </div>
                <div className="message-box__close">
                    {functionType === 'Xóa' ? (
                        <i
                            className="bx bx-check"
                            onClick={onCheckButtonClick}
                        ></i>
                    ) : functionType === 'Chỉnh sửa' ? (
                        <Link to={`/${alias}/editBlog/${slug}`}>
                            <i
                                className="bx bx-check"
                                onClick={() => {
                                    <Link to={`/${alias}/blog/${slug}`} />;
                                }}
                            ></i>
                        </Link>
                    ) : functionType === 'Xuất bản' ? (
                        <i className="bx bx-check" onClick={publishBlog}></i>
                    ) : (
                        <i className="bx bx-check" onClick={unpublishBlog}></i>
                    )}
                    <i className="bx bx-x" onClick={onCloseButtonClick}></i>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
