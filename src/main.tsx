import r2wc from '@r2wc/react-to-web-component';

import './styles.css';

import RichEditor from './components/RichEditor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RichEditor />
    </QueryClientProvider>
  );
};

export const WebRichEditor = r2wc(App);

window.customElements.define('rich-text-editor', WebRichEditor);
