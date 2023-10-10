import styled from 'styled-components';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from '../plugins/toolbar/ToolbarPlugin';
import { BannerNode, BannerPlugin } from '../plugins/banner/BannerPlugin';
import MyAutoFocusPlugin from '../plugins/MyAutoFocusPlugin';

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
  banner: 'rich-editor-banner',
};

const onError = (error: Error): void => {
  console.error(error);
};

const RichEditor = (): JSX.Element => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode, BannerNode],
  };

  return (
    <Wrapper className="RichEditor">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <ListPlugin />
        <BannerPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="content-editable" />}
          placeholder={<div className="placeholder"></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyAutoFocusPlugin />
      </LexicalComposer>
    </Wrapper>
  );
};
export default RichEditor;

const Wrapper = styled.div`
  position: relative;

  --editor-padding: 1rem;
  --toolbar-height: 2.2rem;
  border-radius: var(--border-radius);
  border: var(--default-border);
  background-color: white;

  .content-editable {
    outline: none;
    min-height: 100px;
    width: 500px;
    border-radius: var(--border-radius);
    padding: var(--default-padding) var(--editor-padding);
    background-color: white;
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
    font-size: 3rem;
  }
  .rich-editor-h2 {
    font-size: 2.5rem;
  }
  .rich-editor-h3 {
    font-size: 2rem;
  }
  .rich-editor-h4 {
    font-size: 1.8rem;
  }
  .rich-editor-h5 {
    font-size: 1.6rem;
  }
  .rich-editor-h6 {
    font-size: 1.4rem;
  }

  ol,
  ul {
    list-style-position: inside;
  }
`;
