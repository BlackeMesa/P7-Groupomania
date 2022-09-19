import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../actions/post.action";
import CommentPost from "./CommentPost";
import Delete from "./Delete";
import LikePost from "./LikePost";

const Post = ({ post, user }) => {
  const [edit, setEdit] = useState(false);
  const [editMess, setEditMess] = useState(null);
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();

  const dateFormater = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));

    if (days === 0) {
      return "aujourd'hui";
    } else if (days === 1) {
      return "il y a 1 jour";
    } else {
      return "il y a " + days + " jours";
    }
  };

  const handleEdit = () => {
    setEdit(false);

    if (editMess) {
      dispatch(
        editPost({
          id: post.id,
          message: editMess,
        })
      );
    }
  };
  const checkUserAdmin = () => {
    if (user && (post.authorId === user?.uid || adminUid == user?.uid)) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  useEffect(() => {
    checkUserAdmin();
  }, [user]);

  let adminUid = process.env.REACT_APP_FIREBASE_ADMIN_UID;

  return (
    <div className="posts-container">
      <div className="post">
        <div className="post-header">
          <div className="left-part">
            <div className="title">
              <span>{post.author[0]}</span>
              <h2>{post.author}</h2>
            </div>
            <h5>Posté le : {dateFormater(post.date)}</h5>
          </div>

          {admin && (
            <div className="right-part">
              <span onClick={() => setEdit(!edit)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </span>
              <Delete postId={post.id} img={post.imageName} />
            </div>
          )}
        </div>
        {edit ? (
          <>
            <textarea autoFocus defaultValue={editMess ? editMess : post.message} onChange={(e) => setEditMess(e.target.value)}></textarea>{" "}
            <button className="edit-btn" onClick={() => handleEdit()}>
              Modifier
            </button>
          </>
        ) : (
          <div className="mess-img-container">
            <p>{editMess ? editMess : post.message}</p>
            <div className="img-container">
              <img src={post.imageUrl} alt={post.imageUrl} />
            </div>
          </div>
        )}
        <LikePost post={post} user={user} />
        <CommentPost post={post} user={user} />
      </div>
    </div>
  );
};

export default Post;
