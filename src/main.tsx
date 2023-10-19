import './index.css';

import r2wc from '@r2wc/react-to-web-component';

import { RichEditor } from './components';
export const WebRichEditor = r2wc(RichEditor);

customElements.define('rich-text-editor', WebRichEditor);
