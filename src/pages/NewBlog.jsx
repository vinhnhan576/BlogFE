import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import namingBlogSlug from '../utils/namingSlugs';
import { createNewBlogAsync } from '../features/post/blogSlice';
import { createNewTopic } from '../features/topic/topicSlice';
import Helmet from '../components/Helmet';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { getBloggerByAliasAsync } from '../features/user/bloggerSlice';
import { getUserByUsernameAsync } from '../features/user/userSlice';
import Checkbox from '../components/Checkbox';

const NewBlog = () => {
    const textareaRef = useRef();
    const imageRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const blogger = useSelector((state) => state.blogger);
    // const userSelector = useSelector((state) => state.user);

    const username = JSON.parse(localStorage.getItem('user'))?.account.username;
    useEffect(() => {
        dispatch(getUserByUsernameAsync({ username: username }));
    }, [user.username, dispatch]);

    var date_format = new Date().toISOString().slice(0, 10);
    // console.log(date_format);
    // const date = date_format.getMonth()+'-'+ date_format.getDate()+'-'+date_format.getFullYear()
    // console.log(date)

    const [isChecked, setIsChecked] = useState(true);

    const initialBlogState = {
        title: '',
        content: '',
        quote: '',
        date: date_format,
        location: '',
        slug: '',
        topicID:
            user.Topic !== undefined && user?.Topic.length !== 0
                ? user?.Topic[0]?._id
                : '',
        coverImg: '',
        published: isChecked,
        signature: 'by ' + user.name,
    };

    const [newBlog, setNewBlog] = useState(initialBlogState);

    const handleChange = (input) => (event) => {
        newBlog[input] = event.target.value;
    };

    const handleChecked = (e) => {
        newBlog.published = e;
    };

    const handleTitleChange = () => (event) => {
        newBlog.title = event.target.value;
        newBlog.slug = namingBlogSlug(event.target.value);
    };

    // const [image, setImage] = useState();

    const readImage = (e) => {
        const image = e.target.files[0];
        document.documentElement.style.setProperty(
            '--uploadedImage',
            'url(' + URL.createObjectURL(image) + ')'
        );
        imageRef.current.classList.add('change');
        setNewBlog({ ...newBlog, ['coverImg']: image });
    };

    const imageUploadHandler = (e) => {};

    const [topic, setTopic] = useState({
        topicName: '',
        slug: '',
        quote: '',
        img: '',
        userID: user._id,
    });

    const handleNewBlog = async (e) => {
        e.preventDefault();
        if (newBlog.topicID === 0) {
            const res = await dispatch(createNewTopic({ topic: topic }));
            const result = unwrapResult(res);
            newBlog.topicID = result.tasks.result._id;
        }
        await dispatch(createNewBlogAsync({ blogReqData: newBlog }));
        // await dispatch(getBloggerByAliasAsync(blogger.alias));
		await dispatch(getUserByUsernameAsync({ username: username }));
        navigate(`/${blogger.alias}/`);
    };

    function TopicMenu({ topics }) {
        const [newTopic, setNewTopic] = useState('Chủ đề mới');

        const onTopicClick = () => {
            var option = document.getElementById('topic').value;
            if (option === '0') {
                const input = prompt('Nhập chủ đề mới');
                setNewTopic(input);
                topic.topicName = input;
                topic.slug = namingBlogSlug(input);
                newBlog.topicID = 0;
            } else {
                newBlog.topicID = option;
                setNewTopic('Chủ đề mới');
            }
            console.log(initialBlogState);
        };

        return (
            <div className="select">
                <select name="topic" id="topic" onChange={onTopicClick}>
                    {topics?.length !== 0 ? (
                        topics?.map((topic, index) => {
                            return (
                                <option key={index} value={topic._id}>
                                    {topic.topicName}
                                </option>
                            );
                        })
                    ) : (
                        <option value="1">Chưa có chủ đề nào*</option>
                    )}
                    <option value="0">{newTopic}</option>
                </select>
            </div>
        );
    }

    return (
        <Helmet title="Tạo blog mới">
            <div className="new-blog">
                <div className="new-blog__form__topic">
                    <div className="new-blog__form__topic__published">
                        <Checkbox
                            content={'Published?'}
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                            handleChecked={handleChecked}
                        />
                    </div>
                    <TopicMenu topics={user.Topic}></TopicMenu>
                </div>
                <form className="new-blog__form" onSubmit={handleNewBlog}>
                    <input
                        type="file"
                        name="coverImg"
                        ref={imageRef}
                        onChange={readImage}
                        className="new-blog__form__image"
                    />
                    <input
                        type="text"
                        name="quote"
                        onChange={handleChange('quote')}
                        className="new-blog__form__quote"
                        placeholder="Châm ngôn"
                    />
                    <input
                        type="text"
                        name="location"
                        className="new-blog__form__place"
                        placeholder="Địa điểm"
                        onChange={handleChange('location')}
                    />
                    <input
                        type="text"
                        name="title"
                        className="new-blog__form__title"
                        placeholder="Tiêu đề*"
                        onChange={handleTitleChange()}
                    />
                    <textarea
                        type="text"
                        name="content"
                        className="new-blog__form__body"
                        placeholder="Nội dung*"
                        ref={textareaRef}
                        onChange={handleChange('content')}
                        onKeyUp={(e) => {
                            textareaRef.current.style.height = '200px';
                            let height = e.target.scrollHeight;
                            if (height > 200) {
                                // textareaRef.current.style.height = "auto";
                                textareaRef.current.style.height = `${height}px`;
                            }
                        }}
                    ></textarea>
                    <input
                        type="text"
                        className="new-blog__form__signature"
                        placeholder={initialBlogState.signature}
                        onChange={handleChange('signature')}
                    />
                    <button
                        className="new-blog__form__create-button"
                        type="submit"
                    >
                        Tạo bài viết
                    </button>
                </form>
            </div>
        </Helmet>
    );
};

export default NewBlog;
