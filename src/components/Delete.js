import { deleteObject, getStorage, ref } from "firebase/storage";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/post.action";

const Delete = ({ postId, img }) => {
  const dispatch = useDispatch();
const storage = getStorage();
console.log(img);
  const handleDelete = async () => {
    if (img) {
    const imageRef = ref(storage, `images/${img}`);
   await deleteObject(imageRef).then(()=> {
console.log("Image supprimé");
    }).catch((error) => console.log(error))}
    
     dispatch(deletePost(postId));
  };

  return (
    <span className="delete" onClick={(e) => handleDelete()}>
      <i className="fa-solid fa-trash-can"></i>
    </span>
  );
};

export default Delete;
