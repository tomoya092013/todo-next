import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from "./css/todoList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import EditTodo from "./EditTodo";
import Modal from "react-modal";

export default function TodoList({ isAuth }) {
  const [todoList, setTodoList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editTodoID, setEditTodoID] = useState();

  useEffect(() => {
    const data = query(collection(db, "todos"), orderBy("updatedAt", "desc"));
    const onSnapTodo = onSnapshot(data, (querySnapshot) => {
      setTodoList(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return onSnapTodo;
  }, []);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 50,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
    },

    content: {
      height: "350px",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const editTodo = (id) => {
    setEditTodoID(id);
    openModal();
  };

  return (
    <div className={styles.todoArea}>
      {todoList.map((todo) => {
        const deadline = dayjs(todo.deadline.toDate());
        return (
          <div className={styles.todoContents} key={todo.id}>
            <div className={styles.todoTitle}>
              <input type="checkbox" className={styles.checkbox} />
              <div
                className={styles.editTodo}
                onClick={() => editTodo(todo.id)}
              >
                {todo.title}
              </div>
              <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
              >
                <EditTodo closeModal={closeModal} editTodoID={editTodoID} />
              </Modal>
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
              {isAuth && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.trash}
                  onClick={() => handleDelete(todo.id)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
