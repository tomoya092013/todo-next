import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import Layout from "./components/Layout";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [isAuth, setIsAuth] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
    },

    content: {
      height: "400px",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Layout>
        <div className={styles.nav}>
          {!isAuth ? (
            <div className={styles.login} onClick={loginWithGoogle}>
              <FontAwesomeIcon icon={faRightToBracket} />
              ログイン
            </div>
          ) : (
            <>
              <div className={styles.createTodo} onClick={openModal}>
                Todo登録
              </div>
              <Modal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                style={customStyles}
                ariaHideApp={false}
              >
                <button onClick={() => setModalIsOpen(false)}>
                  Modal閉じる
                </button>
                <CreateTodo closeModal={closeModal} />
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
