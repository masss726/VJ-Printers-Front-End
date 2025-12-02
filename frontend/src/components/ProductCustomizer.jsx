import React, { useState, useEffect, useRef } from 'react';
import ModelViewer3D from './ModelViewer3D.jsx';

const PRODUCT_CONFIG = {
  mug: { name: 'Mug', modelUrl: '/models/mug.glb' },
  tshirt: { name: 'T-Shirt', modelUrl: '/models/tshirt.glb' }, // Example path
  phonecase: { name: 'Phone Case', modelUrl: '/models/phonecase.glb' }, // Example path
};

const ProductCustomizer = ({ product = 'mug' }) => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ff6b6b');
  const [text, setText] = useState('VJ Printers');
  const [textColor, setTextColor] = useState('#ffffff');
  const [use3D, setUse3D] = useState(false);
  const [imageTexture, setImageTexture] = useState(null); // To hold uploaded image URL

  // Draw product on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // clear base
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // If product is mug, draw using the SVG asset and tint it for a more 3D look
    if (product === 'mug') {
      let cancelled = false;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/mug.svg';

      img.onload = () => {
        if (cancelled) return;

        // offscreen canvas to apply tint without altering the original SVG
        const off = document.createElement('canvas');
        const OW = 400;
        const OH = 400;
        off.width = OW;
        off.height = OH;
        const octx = off.getContext('2d');

        // draw SVG onto offscreen scaled to fit
        const scale = Math.min(320 / img.width, 320 / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        const dx = (OW - dw) / 2;
        const dy = (OH - dh) / 2;
        octx.clearRect(0, 0, OW, OH);
        octx.drawImage(img, dx, dy, dw, dh);

        // tint the drawn mug using source-in so we preserve shape alpha
        octx.globalCompositeOperation = 'source-in';
        octx.fillStyle = color;
        octx.fillRect(0, 0, OW, OH);
        octx.globalCompositeOperation = 'source-over';

        // add subtle highlight to make it more 3D
        octx.fillStyle = 'rgba(255,255,255,0.12)';
        octx.beginPath();
        octx.ellipse(OW / 2 - 20, OH / 2 - 70, dw * 0.25, dh * 0.08, -0.4, 0, Math.PI * 2);
        octx.fill();

        // now draw to the main canvas with rotation
        ctx.save();
        ctx.translate(width / 2, height / 2);
        // Rotation is handled by 3D viewer, so we can simplify the 2D view

        const sx = (width - OW) / 2;
        const sy = (height - OH) / 2;
        ctx.drawImage(off, sx, sy, OW, OH);
        ctx.restore();

        // draw text on top
        if (text) {
          ctx.save();
          ctx.font = 'bold 28px Poppins, sans-serif';
          ctx.fillStyle = textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = 'rgba(0,0,0,0.35)';
          ctx.shadowBlur = 6;
          ctx.fillText(text, width / 2, height / 2);
          ctx.restore();
        }
      };

      img.onerror = () => {
        // fallback to canvas-drawn mug
        if (!cancelled) {
          ctx.save();
          ctx.translate(width / 2, height / 2);

          drawMug(ctx, width, height, color);
          ctx.restore();

          if (text) {
            ctx.save();
            ctx.font = 'bold 28px Poppins, sans-serif';
            ctx.fillStyle = textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, width / 2, height / 2);
            ctx.restore();
          }
        }
      };

      return () => {
        cancelled = true;
      };
    }

    // Non-mug products (sync draw)
    ctx.save();
    ctx.translate(width / 2, height / 2);

    if (product === 'tshirt') {
      drawTShirt(ctx, width, height, color);
    } else if (product === 'phonecase') {
      drawPhoneCase(ctx, width, height, color);
    }

    ctx.restore();

    // Draw text on product for non-mug items
    if (text) {
      ctx.save();
      ctx.font = 'bold 28px Poppins, sans-serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 4;
      ctx.fillText(text, width / 2, height / 2);
      ctx.restore();
    }
  }, [color, text, textColor, product]);

  const drawMug = (ctx, width, height, color) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Mug body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 20, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mug handle
    ctx.beginPath();
    ctx.arc(centerX + 85, centerY - 20, 35, Math.PI / 4, (Math.PI * 7) / 4);
    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mug rim
    ctx.fillStyle = '#ddd';
    ctx.fillRect(centerX - 82, centerY - 120, 164, 15);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - 82, centerY - 120, 164, 15);
  };

  const drawTShirt = (ctx, width, height, color) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // T-shirt body
    ctx.fillStyle = color;
    ctx.fillRect(centerX - 70, centerY - 60, 140, 120);

    // Sleeves
    ctx.fillRect(centerX - 70, centerY - 50, 25, 60);
    ctx.fillRect(centerX + 45, centerY - 50, 25, 60);

    // Neckline
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 60, 35, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Outline
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - 70, centerY - 60, 140, 120);
  };

  const drawPhoneCase = (ctx, width, height, color) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Phone case
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(centerX - 50, centerY - 90, 100, 180, 10);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Screen
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.roundRect(centerX - 42, centerY - 80, 84, 160, 8);
    ctx.fill();

    // Screen shine
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.roundRect(centerX - 40, centerY - 78, 80, 20, 6);
    ctx.fill();
  };

  const downloadDesign = () => {
    // If 3D mode, try to capture the WebGL canvas inside the viewer
    if (use3D) {
      const viewerCanvas = document.querySelector('.model-viewer-container canvas');
      if (viewerCanvas) {
        const link = document.createElement('a');
        try {
          link.href = viewerCanvas.toDataURL('image/png');
          link.download = `${product}-design.png`;
          link.click();
          return;
        } catch (e) {
          // fall through to 2D canvas
        }
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${product}-design.png`;
    link.click();
  };

  return (
    <div className="product-customizer">
      <div className="customizer-container">
        <div className="canvas-section">
          {use3D ? (
            <div className="model-viewer-container" style={{ width: '400px', height: '400px', display: 'flex', justifyContent: 'center' }}>
              <ModelViewer3D
                modelUrl={PRODUCT_CONFIG[product]?.modelUrl || '/models/mug.glb'}
                modelColor={color}
                imageTextureUrl={imageTexture}
              />
            </div>
          ) : (
            <>
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="product-canvas"
              />
              <div className="canvas-info">Click and interact with your design</div>
            </>
          )}
        </div>

        <div className="controls-section">
          <h3>Customize Your {PRODUCT_CONFIG[product]?.name || 'Product'}</h3>

          {/* Color Picker */}
          <div className="control-group">
            <label htmlFor="colorPicker">Product Color</label>
            <div className="color-picker-wrapper">
              <input
                id="colorPicker"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="color-input"
              />
              <span className="color-value">{color}</span>
            </div>
          </div>

          {/* 3D Toggle */}
          <div className="control-group">
            <label>Preview Mode</label>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                className={`product-btn ${!use3D ? 'active' : ''}`}
                onClick={() => setUse3D(false)}
                style={{ minWidth: 100 }}
              >
                2D Canvas
              </button>
              <button
                className={`product-btn ${use3D ? 'active' : ''}`}
                onClick={() => setUse3D(true)}
                style={{ minWidth: 100 }}
              >
                3D Viewer
              </button>
            </div>
          </div>

          {/* Quick Colors */}
          <div className="control-group">
            <label>Quick Colors</label>
            <div className="quick-colors">
              {['#ff6b6b', '#51cf66', '#0ea5e9', '#ffd54f', '#ec4899', '#8b5cf6'].map((col) => (
                <button
                  key={col}
                  className={`quick-color ${color === col ? 'active' : ''}`}
                  style={{ backgroundColor: col }}
                  onClick={() => setColor(col)}
                  title={col}
                />
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="control-group">
            <label htmlFor="textInput">Custom Text</label>
            <input
              id="textInput"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.substring(0, 20))}
              maxLength="20"
              className="text-input"
              placeholder="Enter text..."
            />
          </div>

          {/* Text Color */}
          <div className="control-group">
            <label htmlFor="textColorPicker">Text Color</label>
            <div className="color-picker-wrapper">
              <input
                id="textColorPicker"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="color-input"
              />
              <span className="color-value">{textColor}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={() => {
                setColor('#ff6b6b');
                setText('VJ Printers');
                setTextColor('#ffffff');
              }}
              className="btn btn-secondary"
            >
              Reset Design
            </button>
            <button onClick={downloadDesign} className="btn btn-primary">
              Download Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
