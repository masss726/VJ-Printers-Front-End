import React from 'react';

function ProductPreview({ color, text }) {
  return (
    <div className="panel preview-panel">
      <h3>Live Preview</h3>
      <div className="product-preview" style={{ backgroundColor: color }}>
        <div className="product-shape" />
        <div className="product-text">{text || 'Your text here'}</div>
      </div>
      <p className="hint">This is a simple mockup. Later we can replace with real product images.</p>
    </div>
  );
}

export default ProductPreview;


