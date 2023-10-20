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
import { HiCheck } from 'react-icons/hi';

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
  const [isTargetBlank, setIsTargetBlank] = useState(true);
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
    }

    return true;
  }, [editor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });

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
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const insertLink = () => {
    if (lastSelection !== null) {
      if (linkUrl !== '') {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
          url: linkUrl,
          target: isTargetBlank ? '_blank' : '',
        });
      }
    }
  };

  return (
    <Wrapper ref={editorRef} className="FloatingLinkEditor">
      {isEditMode ? (
        <div className="link-input-container">
          <input
            ref={inputRef}
            value={linkUrl}
            className="link-input"
            onChange={(event) => {
              setLinkUrl(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                insertLink();
                setIsEditMode(false);
              } else if (event.key === 'Escape') {
                event.preventDefault();
                setIsEditMode(false);
              }
            }}
          />
          <button
            className="toolbar-btn"
            tabIndex={0}
            onClick={() => {
              insertLink();
              setIsEditMode(false);
            }}
          >
            <HiCheck />
          </button>
        </div>
      ) : (
        <>
          <div className="link-input-container">
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
      <div className="target-blank-selector">
        <input
          type="checkbox"
          checked={isTargetBlank}
          name="target-blank-checkbox"
          onChange={(evt) => {
            setIsTargetBlank(evt.target.checked);
          }}
          disabled={!isEditMode}
        />
        <label
          htmlFor="target-blank-checkbox"
          className={
            isEditMode ? 'target-blank-label' : 'target-blank-label disabled'
          }
        >
          Se abre en una nueva pestaña
        </label>
      </div>
    </Wrapper>
  );
};

export default FloatingLinkEditor;

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: -10000px;
  left: -10000px;
  margin-top: -0.5rem;
  max-width: 300px;
  width: 100%;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: var(--border-radius);
  transition: opacity 0.5s;
  padding: 0.5rem 0.75rem;

  .link-input-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
    background-color: var(--dark-grey);
    height: 2.5rem;
  }

  .link-input {
    font-size: 1rem;
    background-color: var(--dark-grey);
    color: black;
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;
  }

  .link-input a {
    color: blue;
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

  .target-blank-selector {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.25rem;
    font-size: 0.9rem;
  }

  .target-blank-label.disabled {
    color: var(--disabled-color);
  }

  button {
    padding: 0.7rem 0.2rem;
    border-radius: 50%;
  }
  button:hover {
    background-color: #ccc;
  }
`;
