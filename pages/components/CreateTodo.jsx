import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import styles from "./css/createTodo.module.css";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const postTodo = async () => {
    await addDoc(collection(db, "todos"), {
      todo: title,
      detail: detail,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
      },
    });
  };

  return (
    <>
      <div className={styles.postContainer}>
        <label htmlFor="todo">Todo:</label>
        <input
          type="text"
          id="todo"
          placeholder="Todoを記入"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="todo">詳細:</label>
        <textarea
          type="text"
          id="detail"
          placeholder="詳細を記入"
          onChange={(e) => setDetail(e.target.value)}
        />
        <button className="postButton" onClick={postTodo}>
          投稿する
        </button>
      </div>
    </>
  );
}
