import styled from 'styled-components';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

const theme = {};

const onError = (error: Error): void => {
  console.error(error);
};

const PlainEditor = (): JSX.Element => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <Wrapper className="PlainEditor">
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className="content-editable" />}
          placeholder={<div className="placeholder"></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </LexicalComposer>
    </Wrapper>
  );
};
export default PlainEditor;

const Wrapper = styled.div`
  position: relative;
  border-radius: var(--border-radius);
  border: var(--default-border);

  .placeholder {
    position: absolute;
    top: var(--editor-padding);
    left: var(--editor-padding);
    color: #aaa;
  }
`;
