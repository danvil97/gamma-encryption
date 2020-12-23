import React from 'react';

export default function TextAreaFiled({ text, setText, editable }) {
  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
  };
  return (
    <div className="textarea">
      <textarea value={text} onChange={handleChange} disabled={!editable} />
    </div>
  );
}
