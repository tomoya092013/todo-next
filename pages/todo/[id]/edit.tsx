import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "../../editTodo.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useRouter } from "next/router";

export default function EditTodo({ closeModal, editTodoID }) {
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    const getTodo = async () => {
      const docRef = doc(db, "todos", id);
      const docSnap = await getDoc(docRef);
      const todoData = docSnap.data();
      console.log(todoData);
    };
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  return (
    <>
      <div>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => closeModal()}
          className={styles.modalCloseButton}
        />
        <div>
          <label htmlFor="todo">
            Todo:
            <div>⚠️必須</div>
          </label>
          <input
            type="text"
            id="todo"
            placeholder="Todoを記入（必須項目）"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="detail">詳細:</label>
          <textarea
            // type="text"
            id="detail"
            placeholder="詳細を記入"
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="期限"
                inputFormat="YYYY/MM/DD"
                value={deadline}
                onChange={(e) => {
                  // console.log(e);
                  const date = new Date(e);
                  // console.log(date);
                  setDeadline(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        {/* <button onClick={() => updateTodo(id)}>更新する</button> */}
      </div>
    </>
  );
}
