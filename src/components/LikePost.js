import React from "react";
import { useDispatch } from "react-redux";

import { likeButton } from "../actions/post.action";

const LikePost = ({ post, user }) => {
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.preventDefault();
    if (post.likes?.includes(user.uid)) {
      let myIndex = post.likes.indexOf(user.uid);
      post.likes.splice(myIndex, 1);
      console.log("Like retiré");
    } else {
      post.likes.push(user.uid);
      console.log("Like Ajouté");
    }
    dispatch(likeButton(post, post.id));
  };

  return (
    <div>
      {user ? (
        <i className={`fa fa-heart${post.likes?.includes(user.uid) ? "" : "-o"} fa-lg`} style={{ cursor: "pointer", color: post.likes?.includes(user.uid) ? "red" : null }} onClick={(e) => handleLike(e)} />
      ) : (
        <>
          <span className="likes">{post.likes?.length}</span>
          <i className="fa fa-heart" />
        </>
      )}
    </div>
  );
};

export default LikePost;
