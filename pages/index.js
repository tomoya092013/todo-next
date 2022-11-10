import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import Layout from "./components/Layout";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-modal";

export default function Home() {
  const [isAuth, setIsAuth] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      router.push("/");
    });
  };

  const logout = () => {
    //確認ダイアログ
    const res = confirm("ログアウトしますか？");
    if (res !== true) return;
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      router.push("/");
    });
  };

  return (
    <>
      <Layout>
        <div className={styles.nav}>
          {!isAuth ? (
            <div className={styles.login} onClick={loginWithGoogle}>
              ログイン
            </div>
          ) : (
            <>
              <div
                className={styles.createTodo}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Todo登録
              </div>
              <Modal isOpen={isModalOpen} className={styles.modal}>
                <button onClick={() => setIsModalOpen(false)}>
                  Modal閉じる
                </button>
                <CreateTodo setIsModalOpen={setIsModalOpen} />
              </Modal>

              <div className={styles.logout} onClick={logout}>
                ログアウト
              </div>
            </>
          )}
        </div>
        <TodoList />
      </Layout>
    </>
  );
}
