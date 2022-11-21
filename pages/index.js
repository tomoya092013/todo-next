import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import Layout from "../components/Layout";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faFilePen,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "@mui/material/Avatar";

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

  return (
    <>
      <Layout>
        <div className={styles.nav}>
          <h2 className={styles.appTitle}>
            {isAuth && (
              <Avatar
                src={auth.currentUser.photoURL}
                alt="Author Avatar"
                sx={{ width: 36, height: 36 }}
                // className={styles.avater}
              />
            )}
            Todoリスト
          </h2>
          {!isAuth ? (
            <div className={styles.login} onClick={loginWithGoogle}>
              <p>ログイン</p>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className={styles.loginIcon}
              />
            </div>
          ) : (
            <>
              <div className={styles.cteateTodo} onClick={openModal}>
                <FontAwesomeIcon
                  icon={faFilePen}
                  className={styles.createIcon}
                />
              </div>
              <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
                onRequestClose={closeModal}
              >
                <CreateTodo closeModal={closeModal} />
              </Modal>
              <div className={styles.logout} onClick={logout}>
                <FontAwesomeIcon
                  icon={faPersonRunning}
                  className={styles.logoutIcon}
                />
              </div>
            </>
          )}
        </div>
        <TodoList isAuth={isAuth} />
      </Layout>
    </>
  );
}
