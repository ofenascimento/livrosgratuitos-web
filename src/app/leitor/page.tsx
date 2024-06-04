// pages/ler-livro.js
'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Loader from '@/components/Loader/Loader';
import FullScreenLoader from '@/components/FullScreenLoader/FullScreenLoader';

export default function Leitor() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const searchParams = useSearchParams()
  const urlContent = searchParams.get('urlContent')

  useEffect(() => {
    if (typeof window !== 'undefined' && urlContent && typeof urlContent === 'string') {
      const fetchBookContent = async (urlContent: string) => {
        try {
          const response = await fetch(urlContent);
          const textContent = await response.text();
          setContent(textContent);
        } catch (error) {
          console.error("Failed to fetch book content:", error);
        }
      };

      setTimeout(() => {
        setIsLoading(false);
      }, 600)



      fetchBookContent(urlContent);
    }
  }, [urlContent]);

  if (!urlContent || isLoading) return <FullScreenLoader label='Carregando conteúdo' />;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1>Conteúdo do Livro</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#ffffff' }}>
        {content}
      </pre>
    </div>
  );
}
