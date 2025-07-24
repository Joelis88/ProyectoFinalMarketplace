import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductList = () => {
  const [filters, setFilters] = useState({
    category: '',
    condition: '',
    search: ''
  });
  
  const { products, loading, error, pagination } = useProducts(filters);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Filtros */}
      <div className="filters">
        <select
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="">Todas las categorías</option>
          <option value="Mujer">Mujer</option>
          <option value="Hombre">Hombre</option>
          <option value="Niños">Niños</option>
          <option value="Accesorios">Accesorios</option>
        </select>

        <input
          type="text"
          placeholder="Buscar productos..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
      </div>

      {/* Lista de productos */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <p>{product.location}</p>
            <span className="condition">{product.condition}</span>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {pagination && (
        <div className="pagination">
          <span>
            Página {pagination.current_page} de {pagination.total_pages}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductList;