import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

Office.onReady(() => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}); 