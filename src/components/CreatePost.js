import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../actions/post.action";
import { v4 } from "uuid";
import { storage } from "../utils/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CreatePost = ({ uid, displayName }) => {
  const message = useRef();
  const dispatch = useDispatch();
  const [imageUpload, setImageUpload] = useState(null);
  const [bolleen, setBolleen] = useState(true);
  const imageInputRef = useRef();

  async function handlePost(e) {
    e.preventDefault();
    const data = {
      author: displayName,
      authorId: uid,
      message: message.current.value,
      comments: null,
      date: Date.now(),
      imageName: null,
      imageUrl: null,
      likes: [],
    };
    message.current.value = "";

    await dispatch(addPost(data));
    dispatch(getPosts());
  }

  function handlePostImage(e) {
    e.preventDefault();
    const imageName = imageUpload.name + v4();
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const data = {
          author: displayName,
          authorId: uid,
          message: message.current.value,
          comments: null,
          date: Date.now(),
          imageName: imageName,
          imageUrl: url,
          likes: [],
        };
        message.current.value = "";

        dispatch(addPost(data)).then(() => dispatch(getPosts()));
      });
    });
  }

  const handleReset = () => {
    imageInputRef.current.value = "";
    setImageUpload(null);
    setBolleen(true);
  };

  return (
    <div className="new-post-modal">
      <form
        onSubmit={(e) => {
          bolleen ? handlePost(e) : handlePostImage(e);
        }}
      >
        <textarea placeholder="Message..." ref={message}></textarea>
        <input type="submit" value="Envoyer" />
      </form>

      <input
        type="file"
        id="fileControl"
        ref={imageInputRef}
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          setBolleen(false);
        }}
      />
      {!bolleen && <input type="submit" value="supprimer fichier" onClick={() => handleReset()} />}
    </div>
  );
};

export default CreatePost;
