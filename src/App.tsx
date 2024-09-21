import { createRoot } from 'react-dom/client';
import { HomePage } from './Pages/HomePage/HomePage';
import './styles.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<HomePage />);
} else {
  console.error('Root element not found');
}
