import styled from 'styled-components';

import { PiLinkSimpleBold } from 'react-icons/pi';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useState } from 'react';

const InsertLinkButton = ({ isLink }: { isLink: boolean }) => {
  const [editor] = useLexicalComposerContext();
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [link, setLink] = useState('aaa');

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, link);
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <Wrapper>
      <button
        className="toolbar-btn"
        onClick={() => {
          setIsLinkEditMode(!isLinkEditMode);
        }}
      >
        <PiLinkSimpleBold />
      </button>
      {isLinkEditMode && <div className="editor-container"></div>}
    </Wrapper>
  );
};
export default InsertLinkButton;

const Wrapper = styled.div`
  .editor-container {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: var(--light-grey);
    border: var(--default-border);
    transform: translate(-0.5rem, 0.5rem);
  }
`;
