import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function TodoList() {
  const [todoList, srtTodoList] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(collection(db, "todos"));
      console.log(data.docs);
      console.log(data.docs.map((doc) => ({ doc })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      srtTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTodos();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div clasName="todoLists">
      {todoList.map((todo) => {
        return (
          <div className="todoContents" key={todo.id}>
            <div>{todo.title}</div>
            <img
              src={todo.author.photoURL}
              width={64}
              height={64}
              alt="Author Avatar"
            />
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </div>
        );
      })}
    </div>
  );
}
