import styled from 'styled-components';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

const theme = {
  text: {
    bold: 'rich-editor-bold',
    italic: 'rich-editor-italic',
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
  };

  return (
    <Wrapper>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="content-editable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            console.log(editorState);
          }}
        />
      </LexicalComposer>
    </Wrapper>
  );
};
export default RichEditor;

const Wrapper = styled.div`
  position: relative;

  --editor-padding: 1rem;

  .content-editable {
    outline: none;
    min-height: 100px;
    width: 500px;
    border: 1px solid black;
    border-radius: var(--border-radius);
    padding: var(--editor-padding);
    background-color: white;
  }

  .placeholder {
    position: absolute;
    top: var(--editor-padding);
    left: var(--editor-padding);
    color: #aaa;
  }

  .rich-editor-bold {
    font-weight: 600;
  }
  .rich-editor-italic {
    font-style: italic;
  }
`;
