import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';

// Sanitize content to prevent XSS attacks
export const sanitizeContent = (content: string) => {
   return DOMPurify.sanitize(content, {
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'style']
   }).replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
};

export function useDecodedUrl(url: string) {
   const resultUrl = new URLSearchParams(useLocation().search).get(url);
   let decodedUrl: string = '';
   let errorMessage: string | null = null;
   if (!resultUrl) {
      errorMessage = 'No URL provided.';
   } else {
      try {
         decodedUrl = decodeURIComponent(resultUrl);
      } catch (err) {
         errorMessage = 'Invalid URL encoding.';
      }
   }
   return { decodedUrl, errorMessage };
}
