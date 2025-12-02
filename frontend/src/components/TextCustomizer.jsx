import React from 'react';

function TextCustomizer({ value, onChange }) {
  return (
    <div className="panel">
      <h3>Custom Text</h3>
      <input
        className="text-input"
        type="text"
        placeholder="Happy Birthday Anu ❤️"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="hint">This text will appear on your gift preview.</p>
    </div>
  );
}

export default TextCustomizer;


