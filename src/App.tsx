import * as React from 'react';

const App: React.FC = () => {
  const [text, setText] = React.useState('');

  const insertText = async () => {
    try {
      await Word.run(async (context) => {
        const range = context.document.getSelection();
        range.insertText(text, Word.InsertLocation.end);
        await context.sync();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Word Надстройка</h2>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст"
        />
        <button onClick={insertText}>Вставить текст</button>
      </div>
    </div>
  );
};

export default App; 