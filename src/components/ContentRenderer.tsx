// src/components/ContentRenderer.tsx

import React from 'react';
import { ContentBlock } from '@/types/index'; 

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
  return (
    <div className="blog-content-styles space-y-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        
        switch (block.type) {
          case 'paragraph':
            return <p key={key} className="text-lg text-gray-700 leading-relaxed">{block.text}</p>;

          case 'heading':
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
            // Styling for H2 and H3
            const classes = block.level === 2 
              ? "text-3xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2" 
              : "text-2xl font-semibold text-gray-800 mt-6 mb-3";
            return <HeadingTag key={key} className={classes}>{block.text}</HeadingTag>;

          case 'list':
            const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
            // Styling for ordered/unordered lists
            return (
              <ListTag key={key} className={`list-${block.style === 'ordered' ? 'decimal' : 'disc'} pl-8 space-y-2 text-gray-700`}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ListTag>
            );

          case 'break':
            return <div key={key} className="my-8 h-px bg-gray-200" />;

          case 'emphasis':
            const EmphasizedTag = block.style === 'bold' ? 'strong' : 'em';
            return <EmphasizedTag key={key}>{block.text}</EmphasizedTag>;
          
          default:
            return null;
        }
      })}
    </div>
  );
};