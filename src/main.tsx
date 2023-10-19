import r2wc from '@r2wc/react-to-web-component';

import RichEditor from './components/RichEditor';
export const WebRichEditor = r2wc(RichEditor);

customElements.define('rich-text-editor', WebRichEditor);
