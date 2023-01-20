import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Avatar from 'react-avatar-edit';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../features/user/userSlice';

const Settings = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    // const blogger = useSelector((state) => state.blogger);
    var [src, setSrc] = useState(
        user.profilepic === '' ||
            user.profilepic === undefined
            ? require('../assets/image/user/alt.png')
            : 'data:image/jpg;base64,' + user.profilepic
    );
    var [newImg, setNewImg] = useState();
    var [editting, setEditting] = useState(false);
    const [file, setFile] = useState();
    const [changeImg, setChangeImg] = useState(false);
    const editRef = useRef();
    const pfpRef = useRef();

    const onEditClick = () => {
        setEditting(!editting);
        editRef.current.classList.toggle('editting');
        if (editting === false) {
            editRef.current.innerHTML = '&#10003;';
        } else {
            dispatch(
                updateUserAsync({
                    id: user._id,
                    userReq: { profilepic: file },
                })
            );
            setChangeImg(true);
            setSrc(newImg);
            editRef.current.innerHTML = 'Đổi ảnh';
        }
    };

    const onStopClick = () => {
        setEditting(!editting);
        editRef.current.classList.toggle('editting');
        if (editting === false) {
            editRef.current.innerHTML = '&#10003;';
        } else {
            setChangeImg(false);
            editRef.current.innerHTML = 'Đổi ảnh';
        }
    };

    const onImageLoad = (e) => {
        // setWidth()
        console.log(e);
    };

    return (
        <div className="Settings">
            <div className="Settings__left">
                <div className="Settings__left__pfp">
                    {editting === true ? (
                        <Avatar
                            width={350}
                            height={350}
                            onCrop={(e) => setNewImg(e)}
                            onFileLoad={(file) => setFile(file)}
                        ></Avatar>
                    ) : user.profilepic === '' ||
                      user.profilepic === undefined ? (
                        <div className="Settings__left__pfp__img-container">
                            <img
                                src={changeImg === true ? newImg : src}
                                alt=""
                                ref={pfpRef}
                            />
                        </div>
                    ) : (
                        <div className="Settings__left__pfp__img-container">
                            <img
                                src={changeImg === true ? newImg : src}
                                alt=""
                                ref={pfpRef}
                            />
                        </div>
                    )}
                </div>
                <div className="Settings__left__change">
                    <div
                        className="Settings__left__change__edit"
                        onClick={onEditClick}
                        ref={editRef}
                    >
                        Đổi ảnh
                    </div>
                    {editting === true && (
                        <div
                            className="Settings__left__change__stop"
                            onClick={onStopClick}
                        >
                            &#x2715;
                        </div>
                    )}
                </div>
            </div>
            <div className="Settings__right"></div>
        </div>
    );
};

export default Settings;
