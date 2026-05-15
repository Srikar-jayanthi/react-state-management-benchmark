import { useRef, useEffect } from 'react';

const useRenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
};

export const RenderCount = () => {
  const count = useRenderCounter();
  return (
    <small 
      style={{ 
        backgroundColor: '#ffeb3b', 
        padding: '2px 6px', 
        borderRadius: '4px', 
        fontSize: '0.7rem',
        marginLeft: '10px',
        color: '#000',
        fontWeight: 'bold'
      }}
      data-testid="render-count"
    >
      {count}
    </small>
  );
};
