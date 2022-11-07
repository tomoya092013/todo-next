import Link from "next/link";
import styles from "./css/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <Link href="/components/CreatePost">Todo登録</Link>
      <Link href="/components/TodoList">Todoリスト</Link>
      <Link href="/components/Login">ログイン</Link>
      <Link href="/components/Logout">ログアウト</Link>
    </div>
  );
}
