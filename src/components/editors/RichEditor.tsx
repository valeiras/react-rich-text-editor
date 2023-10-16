/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';

import { HeadingNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';

import {
  ToolbarPlugin,
  AutoLinkPlugin,
  YouTubePlugin,
  AutoEmbedPlugin,
} from '../plugins';
import { YouTubeNode } from '../nodes/YouTubeNode';

const theme = {
  heading: {
    h1: 'rich-editor-h1',
    h2: 'rich-editor-h2',
    h3: 'rich-editor-h3',
    h4: 'rich-editor-h4',
    h5: 'rich-editor-h5',
    h6: 'rich-editor-h6',
  },
  text: {
    bold: 'rich-editor-bold',
    italic: 'rich-editor-italic',
    underline: 'rich-editor-underline',
    strikethrough: 'rich-editor-strikethrough',
  },
  link: 'rich-editor-link',
  list: {
    ul: 'rich-editor-ul',
    ol: 'rich-editor-ol',
  },
};

const onError = (error: Error): void => {
  console.error(error);
};

const RichEditor = (): JSX.Element => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      YouTubeNode,
    ],
  };

  return (
    <Wrapper className="RichEditor">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <ListPlugin />
        <LinkPlugin />
        <LexicalClickableLinkPlugin />
        <AutoLinkPlugin />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <ContentEditable className="content-editable" />
            </div>
          }
          placeholder={<div className="placeholder"></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <YouTubePlugin />
        <AutoEmbedPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </Wrapper>
  );
};
export default RichEditor;

const Wrapper = styled.div`
  position: relative;

  --toolbar-height: 2.2rem;
  border-radius: var(--border-radius);
  border: var(--default-border);
  background-color: white;
  overflow: hidden;

  .editor-scroller {
    height: 20rem;
    overflow-y: scroll;
  }
  .placeholder {
    position: absolute;
    top: calc(var(--toolbar-height) + var(--editor-padding));
    left: var(--editor-padding);
    color: #aaa;
  }

  .rich-editor-bold {
    font-weight: 600;
  }
  .rich-editor-italic {
    font-style: italic;
  }
  .rich-editor-underline {
    text-decoration: underline;
  }
  .rich-editor-strikethrough {
    text-decoration: line-through;
  }

  .rich-editor-h1 {
    font-size: 40px;
  }
  .rich-editor-h2 {
    font-size: 36px;
  }
  .rich-editor-h3 {
    font-size: 32px;
  }
  .rich-editor-h4 {
    font-size: 28px;
  }
  .rich-editor-h5 {
    font-size: 24px;
  }
  .rich-editor-h6 {
    font-size: 20px;
  }

  .rich-editor-ol,
  .rich-editor-ul {
    list-style-position: inside;
  }

  .rich-editor-link {
    text-decoration: none;
    cursor: pointer;
    font-weight: 600;
    color: purple;
  }
`;