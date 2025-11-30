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
          <div>List View</div>
          <input
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
              <div className={styles.photo} key={crypto.randomUUID()}>
                <Link to={`/${p.id}`}>
                  <img className={styles.main_image} src={p.mediaUrl} />
                </Link>
              </div>
            ))
          )}
        </div>
        <button disabled={page >= (data?.pageData.totalPages ?? 1)} onClick={loadMoreProducts}>
          Cargar más
        </button>
      </div>
    </Layout>
  );
};

export default ProductList;
