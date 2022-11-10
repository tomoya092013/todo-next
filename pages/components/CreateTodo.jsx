import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { auth, db } from "../firebase";
import styles from "./css/createTodo.module.css";
import { useState } from "react";

export default function CreateTodo({ closeModal }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState("");
  // const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const postTodo = async () => {
    await addDoc(collection(db, "todos"), {
      title: title,
      detail: detail,
      deadline: deadline,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    closeModal(false);
  };

  return (
    <>
      <div className={styles.todoContainer}>
        <div className={styles.title}>
          <label htmlFor="todo" className={styles.label}>
            Todo:
            <div className={styles.attention}>⚠️必須</div>
          </label>
          <input
            type="text"
            id="todo"
            placeholder="Todoを記入"
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.detail}>
          <label htmlFor="detail" className={styles.label}>
            詳細:
          </label>
          <textarea
            type="text"
            id="detail"
            placeholder="詳細を記入"
            onChange={(e) => setDetail(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="期限"
              inputFormat="YYYY/MM/DD"
              value={deadline}
              onChange={(e) => setDeadline(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <button className="postButton" onClick={postTodo}>
          投稿する
        </button>
      </div>
    </>
  );
}
