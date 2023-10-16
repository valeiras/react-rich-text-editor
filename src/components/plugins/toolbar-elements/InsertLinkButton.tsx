import styled from 'styled-components';

import { BiLinkAlt } from 'react-icons/bi';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import FloatingLinkEditor from '../../editor-elements/FloatingLinkEditor';
import { toast } from 'react-toastify';

const InsertLinkButton = ({ isLink }: { isLink: boolean }) => {
  const [editor] = useLexicalComposerContext();
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleLink = useCallback(() => {
    if (!isLink) {
      // We prevent the insertion of the link if no text is selected
      if (window.getSelection()?.isCollapsed) {
        toast.error(
          'Selecciona el texto que quieras convertir en un hiperenlace'
        );
      } else {
        setIsEditMode(true);
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
          url: '',
          target: '_blank',
        });
      }
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <Wrapper>
      <button
        className={isLink ? 'toolbar-btn active-btn' : 'toolbar-btn'}
        onClick={toggleLink}
      >
        <BiLinkAlt />
      </button>
      {isLink &&
        createPortal(
          <FloatingLinkEditor
            editor={editor}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />,
          document.body
        )}
    </Wrapper>
  );
};
export default InsertLinkButton;

const Wrapper = styled.div`
  position: relative;

  .editor-container {
    position: absolute;
    top: 2.2rem;
    left: -0.3rem;
    width: 300px;
    height: 100px;
    background-color: white;
    border-radius: var(--border-radius);
    border: var(--default-border);
    z-index: 10;
    transition: var(--transition);
  }
`;
