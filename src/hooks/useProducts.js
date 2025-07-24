
import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    if (!filters) return;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getProducts(filters);
        setProducts(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, loading, error, pagination };
};