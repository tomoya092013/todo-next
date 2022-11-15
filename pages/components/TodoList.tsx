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

type Todo = {
  id: string;
  title: string;
  detail: string;
  deadline: Date;
  author: {
    username: string;
    id: number;
    photoURL: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[] | []>([]);
  useEffect(() => {
    // const getTodos = async () => {
    //   const data = await getDocs(collection(db, "todos"));
    //   console.log(data.docs);
    //   console.log(data.docs.map((doc) => ({ doc })));
    //   console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    const data = query(collection(db, "todos"), orderBy("updatedAt", "desc"));
    const onSnapTodo = onSnapshot(data, (querySnapshot) => {
        // setTodoList();
    });
    return onSnapTodo;
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="todoLists">
      {todoList.map((todo) => {
        return (
          <div className="todoContents" key={todo.id}>
            <div>{todo.title}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
