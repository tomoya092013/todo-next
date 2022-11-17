import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from "./css/todoList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  useEffect(() => {
    const data = query(collection(db, "todos"), orderBy("updatedAt", "desc"));
    const onSnapTodo = onSnapshot(data, (querySnapshot) => {
      setTodoList(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      console.log(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return onSnapTodo;
  }, []);

  return (
    <div className={styles.todoArea}>
      {todoList.map((todo) => {
        const deadline = dayjs(todo.deadline.toDate());
        return (
          <div className={styles.todoContents} key={todo.id}>
            <div className={styles.todoTitle}>
              <input type="checkbox" className={styles.checkbox} />
              <div>{todo.title}</div>
            </div>
            <hr></hr>
            <div className={styles.underContent}>
              <ListItemAvatar>
                <Avatar
                  src={todo.author.photoURL}
                  alt="Author Avatar"
                  sx={{ width: 48, height: 48 }}
                  className={styles.avater}
                />
              </ListItemAvatar>
              <div className={styles.deadline}>
                期限：{deadline.format("YYYY/MM/DD")}
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.trash}
                onClick={() => handleDelete(todo.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
