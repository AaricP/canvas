import { useEffect, useState } from "react";

export default function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        setData(result);
      } catch (error) {
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFn, trigger]);

  const refetch = () => setTrigger((prev) => !prev);

  return { data, loading, error, refetch };
}
