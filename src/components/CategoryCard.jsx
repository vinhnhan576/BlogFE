import React, { useRef } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MessageBox from "./MessageBox";
import { deleteBlogAsync } from "../features/post/blogSlice";
import { useDispatch, useSelector } from "react-redux";

import alt from "../assets/image/blog/alt.jpg";

const CategoryCard = (props) => {
	const dispatch = useDispatch();
	const params = useParams();
	const bodyImageRef = useRef();
	const onImgLoad = ({ target: img }) => {
		const { offsetHeight, offsetWidth } = img;
		if (offsetWidth > offsetHeight)
			bodyImageRef.current.classList.add("landscape");
		else bodyImageRef.current.classList.add("portrait");
	};

	const [openMessageBox, setOpenMessageBox] = useState(false);

	const [messageBoxType, setMessageBoxType] = useState();

	const publish = useRef();
	const store = useRef();

	const onCheckButtonClick = () => {
		setOpenMessageBox(false);
		dispatch(deleteBlogAsync(props.id));
	};

	const onCloseButtonClick = () => {
		setOpenMessageBox(false);
	};

	const user = useSelector((state) => state.user);
	const blogger = useSelector((state) => state.blogger);

	const isEqual = (...objects) =>
		objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
	const isLoggedIn = isEqual(user, blogger);

	return (
        <div className="category_container" id={props.id}>
            <Link to={`/${params.alias}/blog/${props.slug}`}>
                <div className="category_container-image" ref={bodyImageRef}>
                    {props.img !== undefined ? (
                        <img
                            onLoad={onImgLoad}
                            src={'data:image/jpg;base64,' + props.img.toString('base64')}
                            alt=""
                        />
                    ) : (
                        <img onLoad={onImgLoad} src={alt} alt="" />
                    )}
                </div>
                <div className="category_container-content">
                    <h3>{props.date}</h3>
                    <h1>{props.title}</h1>
                    <p>{props.content}</p>
                </div>
            </Link>
            {isLoggedIn && (
                <div className="category_container-functions">
                    <div className="category_container-functions-left">
                        {/* <i
							className="bx bx-paper-plane"
							ref={publish}
							onClick={() => {
								setOpenMessageBox(!openMessageBox);
								setMessageBoxType("Xuất bản");
								store.current.classList.toggle("hidden");
							}}></i>
						<i
							className="bx bxs-box hidden"
							ref={store}
							onClick={() => {
								setOpenMessageBox(!openMessageBox);
								setMessageBoxType("Lưu trữ");
								publish.current.classList.toggle("hidden");
							}}></i> */}
                    </div>

                    <div className="category_container-functions-right">
                        <i
                            className="bx bxs-edit-alt"
                            onClick={() => {
                                setOpenMessageBox(!openMessageBox);
                                setMessageBoxType('Chỉnh sửa');
                            }}
                        ></i>
                        <i
                            className="bx bxs-trash"
                            onClick={() => {
                                setOpenMessageBox(!openMessageBox);
                                setMessageBoxType('Xóa');
                            }}
                        ></i>
                    </div>
                </div>
            )}
            {openMessageBox && (
                <MessageBox
                    alias={params.alias}
                    slug={props.slug}
                    title={`${messageBoxType} blog`}
                    body={`Bạn có chắc chắn muốn ${messageBoxType.toLowerCase()} `}
                    blogName={props.title}
                    onCloseButtonClick={onCloseButtonClick}
                    onCheckButtonClick={onCheckButtonClick}
                    functionType={messageBoxType}
                />
            )}
        </div>
    );
};

export default CategoryCard;
