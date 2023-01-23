import React from 'react';
import { useState } from 'react';
import Reply from './Reply';

const Comment = ({ comment, alias, pfp, head, lastchild, blogID, userID }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [newReply, setNewReply] = useState(false);

    return (
        <div className="comment">
            <div className={`comment__card`}>
                <div className="comment__card__left">
                    <div className="comment__card__left__pfp"></div>
                    {/* {!head && (
                        <div className="comment__card__left__connectline"></div>
                    )} */}
                </div>
                <div
                    className={`comment__card__right ${
                        comment.children &&
                        comment.children.length > 0 &&
                        'border'
                    } ${lastchild === true ? 'lastchild' : ''} ${
                        !showReplies ? 'hiding-replies' : ''
                    }`}
                >
                    <div className="comment__card__right__title">
                        <div className="comment__card__right__title__alias">
                            {alias}
                        </div>
                        <div className="comment__card__right__title__timestamp">
                            {/* {comment.createdAt.slice(0, 16)} */}
                            {showingTimestamp(comment.createdAt)}
                        </div>
                    </div>
                    <div className="comment__card__right__context">
                        {comment.context}
                    </div>
                    <div className="comment__card__right__options">
                        <div
                            className="comment__card__right__options__reply"
                            onClick={() => setNewReply(!newReply)}
                        >
                            reply
                        </div>
                    </div>
                    {/* : ( */}
                    <div
                        className={`comment__card__right__replies ${
                            showReplies ? 'show-replies' : ''
                        }`}
                    >
                        {comment.children &&
                            comment.children.map((child, index) => {
                                return (
                                    <Comment
                                        comment={child}
                                        key={child._id}
                                        alias={alias}
                                        head={false}
                                        blogID={blogID}
                                        userID={userID}
                                        lastchild={
                                            index ===
                                            comment.children.length - 1
                                                ? true
                                                : false
                                        }
                                    />
                                );
                            })}
                    </div>
                    {comment.childNum > 0 && (
                        <div
                            className="comment__card__right__show-reply"
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {!showReplies ? 'show' : 'hide'}{' '}
                            {comment.children.length}{' '}
                            {comment.children.length === 1
                                ? 'reply'
                                : 'replies'}
                            <div className="comment__card__left__connectline"></div>
                        </div>
                    )}
                    {/* ) */}
                    {/* } */}
                    {newReply && (
                        <Reply
                            blogID={blogID}
                            userID={userID}
                            parentID={comment._id}
                            setShowReplies={setShowReplies}
                            setNewReply={setNewReply}
                            head={false}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const showingTimestamp = (timestamp) => {
    var date = new Date(timestamp);
    var now = new Date();
    if (date.getFullYear() === now.getFullYear())
        if (date.getMonth() === now.getMonth()) {
            if (date.getDate() === now.getDate()) {
                if (date.getHours() === now.getHours()) {
                    if (date.getMinutes() === now.getMinutes()) {
                        return (
                            Math.floor(Math.abs(now - date) / 1000) + 'sec'
                        );
                    }
                    return (
                        Math.floor(Math.abs(now - date) / 1000 / 60) + 'm'
                    );
                }
                return (
                    Math.floor(Math.abs(now - date) / 1000 / 60 / 24) +
                    'h'
                );
            }
            return (
                Math.floor(Math.abs(now - date) / 1000 / 60 / 60 / 24) + 'd'
            );
        }
};

export default Comment;
