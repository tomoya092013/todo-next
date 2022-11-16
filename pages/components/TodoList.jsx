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
    <div className={styles.todoLists}>
      {todoList.map((todo) => {
        const deadline = dayjs(todo.deadline.toDate());
        return (
          <div className={styles.todoContents} key={todo.id}>
            <div className={styles.title}>
              <input type="checkbox" />
              <div>{todo.title}</div>
            </div>
            <div className={styles.createDate}>
              <ListItemAvatar>
                <Avatar
                  src={todo.author.photoURL}
                  alt="Author Avatar"
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <time datetime={deadline.format("YYYY-MM-DDTHH:mm")}>
                {deadline.format("YYYY-MM-DD")}
              </time>
              <button onClick={() => handleDelete(todo.id)}>
                <FontAwesomeIcon icon={faTrash} className={styles.icon} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
