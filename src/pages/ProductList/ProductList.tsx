import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { Product } from '../../core/types/types';
import { useProductList } from '../../hooks/useProductList';
import styles from './styles.module.scss';

const ProductList = () => {
  const { data, isLoading, search, handleSearch, page, loadMoreProducts } = useProductList();
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>List View</h1>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className={styles.content}>
          {isLoading ? (
            <p>Loading data</p>
          ) : (
            data?.data.map((p: Product) => (
              <Link to={`/${p.id}`} key={crypto.randomUUID()} className={styles.card_hover}>
                <div className={styles.card}>
                  <div className={styles.main_image}>
                    <img src={p.mediaUrl} />
                  </div>
                  <div className={styles.data}>
                    <p className={styles.data_name}>{p.name.toLowerCase()}</p>
                    <p className={styles.data_price}>{p.price} EUR</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className={styles.load_more}>
          <button
            className={styles.load_more_btn}
            disabled={page >= (data?.pageData.totalPages ?? 1)}
            onClick={loadMoreProducts}
          >
            Cargar más
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
