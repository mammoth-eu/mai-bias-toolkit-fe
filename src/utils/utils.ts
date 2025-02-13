import DOMPurify from 'dompurify';

// Sanitize content to prevent XSS attacks
export const sanitizeContent = (content: string) => {
   return DOMPurify.sanitize(content, {
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'style']
   }).replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
};
