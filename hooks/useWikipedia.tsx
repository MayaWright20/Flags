// hooks/useWikipediaSummary.ts
import { useEffect, useState } from 'react';

type WikiSummary = {
  title: string;
  description?: string;
  extract?: string;
  thumbnail?: { source: string; width: number; height: number };
  content_urls?: {
    desktop?: { page: string };
    mobile?: { page: string };
  };
};

export function useWikipediaSummary(pageTitle: string) {
  const [data, setData] = useState<WikiSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          pageTitle
        )}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json: WikiSummary = await res.json();
        if (isMounted) setData(json);
      } catch (e: any) {
        if (isMounted) setError(e.message ?? 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [pageTitle]);

  return { data, loading, error };
}
