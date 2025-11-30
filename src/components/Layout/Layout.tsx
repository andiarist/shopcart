import logoImg from '../../assets/react.svg';
import { CartPannel } from '../CartPannel/CartPannel';
import styles from './styles.module.scss';
import { Link, useParams } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header_left}>
          <Link to="/">
            <img src={logoImg} alt="Logo" style={{ height: '40px' }} loading="lazy" />
          </Link>
          <Link to="/" className={styles.home_link}>
            Home
          </Link>
          {params.id && <span>/ {params.id}</span>}
        </div>
        <div className={styles.header_right}>
          <CartPannel />
        </div>
      </header>
      <main>{children}</main>
      <footer className={styles.footer_container}>
        &copy; Shopcart {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
