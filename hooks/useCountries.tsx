import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useCountries() {
  const [allCountries, setAllCountries] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name'
      );
      setAllCountries(response.data);
    } catch (error) {
      console.error('Error fetching Countries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return {
    allCountries,
    loading,
  };
}
