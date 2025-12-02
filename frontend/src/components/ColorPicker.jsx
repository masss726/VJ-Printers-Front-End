import React from 'react';

const COLORS = ['#f97316', '#0ea5e9', '#22c55e', '#e11d48', '#64748b'];

function ColorPicker({ value, onChange }) {
  return (
    <div className="panel">
      <h3>Product Color</h3>
      <div className="color-row">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className="color-swatch"
            style={{
              backgroundColor: c,
              outline: value === c ? '3px solid #111827' : 'none'
            }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;


