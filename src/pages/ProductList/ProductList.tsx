import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { Product } from '../../core/types/types';
import { useProductList } from '../../hooks/useProductList';
import styles from './styles.module.scss';
import { Loader } from '../../components/Loader/Loader';

const ProductList = () => {
  const { data, isLoading, isError, search, handleSearch, page, loadMoreProducts, allProducts } =
    useProductList();
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>List View</h1>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className={styles.content}>
          {isLoading || (allProducts.length === 0 && !isError) ? (
            <Loader />
          ) : (
            allProducts.map((p: Product) => (
              <Link
                to={`/${p.id}`}
                key={crypto.randomUUID()}
                className={styles.card_hover}
                data-testid={`link-to${p.id}`}
              >
                <div className={styles.card}>
                  <div className={styles.main_image}>
                    <img src={p.mediaUrl} />
                  </div>
                  <div className={styles.data}>
                    <p className={styles.data_name}>{p.name.toLowerCase()}</p>
                    <p className={styles.data_price}>{p.price / 100} EUR</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        {isError ? (
          <>
            <p>There was an error loading products</p>
            <p>Please, try it later</p>
          </>
        ) : (
          <div className={styles.load_more}>
            <button
              className={styles.load_more_btn}
              disabled={page >= (data?.pageData.totalPages ?? 1)}
              onClick={() => loadMoreProducts()}
            >
              Load more...
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductList;
