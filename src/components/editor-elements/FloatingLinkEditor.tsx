import styled from 'styled-components';
import {
  LexicalEditor,
  RangeSelection,
  GridSelection,
  NodeSelection,
} from 'lexical';
import { useRef, useState, useCallback, useEffect } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import getSelectedNode from '../../utils/getSelectedNode';
import { BiSolidEditAlt } from 'react-icons/bi';

import { LOW_PRIORITY } from '../../utils/constants';

const positionEditorElement = (editor: HTMLElement, rect: DOMRect | null) => {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.scrollY + 10}px`;
    editor.style.left = `${
      rect.left + window.scrollX - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
};

const FloatingLinkEditor = ({
  editor,
  isEditMode,
  setIsEditMode,
}: {
  editor: LexicalEditor;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | GridSelection | NodeSelection | null
  >(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      nativeSelection &&
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner: Element = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection as RangeSelection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setIsEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor, setIsEditMode]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LOW_PRIORITY
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <Wrapper ref={editorRef} className="FloatingLinkEditor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== '') {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setIsEditMode(false);
              }
            } else if (event.key === 'Escape') {
              event.preventDefault();
              setIsEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <button
              className="toolbar-btn"
              tabIndex={0}
              onClick={() => {
                setIsEditMode(true);
              }}
            >
              <BiSolidEditAlt />
            </button>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default FloatingLinkEditor;

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  max-width: 300px;
  width: 100%;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  transition: opacity 0.5s;

  .link-input {
    display: flex;
    justify-content: space-between;
    width: calc(100% - 24px);
    box-sizing: border-box;
    margin: 8px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #eee;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;
  }

  .link-edit {
  }

  .link-input a {
    color: rgb(33, 111, 219);
    text-decoration: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 30px;
    text-overflow: ellipsis;
  }

  .link-input a:hover {
    text-decoration: underline;
  }

  .button {
    width: 20px;
    height: 20px;
    display: inline-block;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    margin: 0 2px;
  }

  .button.hovered {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #eee;
  }

  .button i {
    background-size: contain;
    display: inline-block;
    height: 20px;
    width: 20px;
    vertical-align: -0.25em;
  }
`;
