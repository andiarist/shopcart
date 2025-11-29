import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useGetProductsListQuery } from '../../core/services/shopCartApi';
import styles from './styles.module.scss';
import { Product } from '../../core/types/types';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetProductsListQuery({
    page,
    limit: 40,
    search,
  });
  useEffect(() => {
    console.log('dentro del efecto de busqueda');
    setPage(1);
  }, [search]);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>List View</div>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => {
              console.log('dentro de search');
              setSearch(e.target.value);
            }}
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
        <button
          disabled={page >= (data?.pageData.totalPages ?? 1)}
          onClick={() => setPage((p) => p + 1)}
        >
          Cargar más
        </button>
      </div>
    </Layout>
  );
};

export default ProductList;
