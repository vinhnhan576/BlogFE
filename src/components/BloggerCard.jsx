import React from 'react';
import alt from '../assets/image/user/alt.png';

const BloggerCard = ({ blogger }) => {
    console.log(blogger);
    return (
        <div className="blogger-card">
            <div className="blogger-card__container">
                <div className="blogger-card__pfp">
                    {blogger.profilepic !== '' &&
                    blogger.profilepic !== undefined ? (
                        <img
                            src={'data:image/jpg;base64,' + blogger.profilepic}
                            alt={alt}
                        />
                    ) : (
                        <img src={alt} alt={alt} />
                    )}
                </div>
                <div className="blogger-card__alias">{blogger.alias}</div>
                <div className="blogger-card__blog-published">
                    blogs published:
                    <span
                        className="blogger-card__blog-published__num"
                    >
                        {blogger.blogSum}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BloggerCard;
