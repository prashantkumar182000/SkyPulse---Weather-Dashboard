// hooks/useFetchImage.ts
import { useState, useEffect } from 'react';

const useFetchImage = (condition: string | undefined) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!condition) return;
      try {
        const apiKey = 'rkLqsF0rpXalqKnUXAh7ELJaZ5bjVSXkJIJZz1QqkDzUFUtqd8xMOj32';
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${condition}&per_page=1`,
          {
            headers: { Authorization: apiKey },
          }
        );
        const data = await response.json();
        if (data.photos?.length > 0) {
          setImageUrl(data.photos[0].src.original);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, [condition]);

  return imageUrl;
};

export default useFetchImage;
