/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';

import { useState } from 'react';
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
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';

import {
  ToolbarPlugin,
  AutoLinkPlugin,
  YouTubePlugin,
  AutoEmbedPlugin,
  DraggableBlockPlugin,
} from '../plugins';
import GlobalStyles from './GlobalStyles';
import { YouTubeNode } from '../nodes/YouTubeNode';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagesPlugin from '../plugins/ImagesPlugin';
import { ImageNode } from '../nodes/ImageNode';

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
  embedBlock: {
    base: 'rich-editor-embed-block',
    focus: 'rich-editor-embed-block-focus',
  },
  image: 'rich-editor-image',
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
      ImageNode,
    ],
  };

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  // For some reason, typescript doesn't acept the usual ternary operator approach
  const SafeDraggablePlugin = () => {
    if (!floatingAnchorElem) return null;

    return <DraggableBlockPlugin anchorElem={floatingAnchorElem} />;
  };

  return (
    <GlobalStyles>
      <ToastContainer position="top-center" transition={Slide} />
      <Wrapper className="RichEditor">
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <ListPlugin />
          <LinkPlugin />
          <LexicalClickableLinkPlugin />
          <AutoLinkPlugin />
          <TabIndentationPlugin />
          <SafeDraggablePlugin />
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable className="content-editable" />
                </div>
              </div>
            }
            placeholder={<div className="placeholder"></div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <YouTubePlugin />
          <AutoEmbedPlugin />
          <AutoFocusPlugin />
          <ImagesPlugin />
        </LexicalComposer>
      </Wrapper>
    </GlobalStyles>
  );
};
export default RichEditor;

const Wrapper = styled.div`
  border-radius: var(--border-radius);
  border: var(--default-border);
  width: 800px;
  overflow: hidden;
  resize: both;

  .editor-scroller {
    min-height: 20rem;
    border: 0;
    display: flex;
    position: relative;
    outline: 0;
    z-index: 0;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }

  .editor {
    flex: auto;
    position: relative;
    border-radius: var(--border-radius);
    resize: vertical;
    z-index: -1;
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

  .rich-editor-embed-block {
    user-select: none;
    /* height: fit-content; */
    padding: 7px;
    padding-bottom: 0;
  }

  .rich-editor-embed-block-focus {
    outline: 2px dashed #eee;
  }

  .rich-editor-image {
    cursor: default;
    display: inline-block;
    position: relative;
    user-select: none;
    width: 100%;
  }

  .rich-editor-image img {
    width: 100%;
    cursor: default;
  }

  .rich-editor-image img.focused {
    outline: 2px solid rgb(60, 132, 244);
    user-select: none;
  }

  .rich-editor-image .image-caption-container .tree-view-output {
    margin: 0;
    border-radius: 0;
  }

  .rich-editor-image .image-caption-container {
    display: block;
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    border-top: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.9);
    min-width: 100px;
    color: #000;
    overflow: hidden;
  }

  .rich-editor-image .image-caption-button {
    display: block;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 30%;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    min-width: 100px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }

  .rich-editor-image .image-caption-button:hover {
    background-color: rgba(60, 132, 244, 0.5);
  }

  .rich-editor-image .image-edit-button {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    background-image: url(/src/images/icons/pencil-fill.svg);
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    height: 35px;
    vertical-align: -0.25em;
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
    user-select: none;
  }

  .rich-editor-image .image-edit-button:hover {
    background-color: rgba(60, 132, 244, 0.1);
  }
`;
