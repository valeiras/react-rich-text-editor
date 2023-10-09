import styled from 'styled-components';
import { PiListNumbersLight, PiListBulletsLight } from 'react-icons/pi';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ReactNode } from 'react';

type ListTag = 'ol' | 'ul';

const ListToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const listTags: { tag: ListTag; icon: ReactNode }[] = [
    { tag: 'ol', icon: <PiListNumbersLight /> },
    { tag: 'ul', icon: <PiListBulletsLight /> },
  ];

  const makeSelectionList = (tag: ListTag): void => {
    if (tag === 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    } else if (tag === 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      return;
    }
  };

  return (
    <Wrapper>
      {listTags.map(({ tag, icon }) => {
        return (
          <button
            className="toolbar-btn"
            onClick={() => {
              makeSelectionList(tag);
            }}
            key={tag}
          >
            {icon}
          </button>
        );
      })}
    </Wrapper>
  );
};
export default ListToolbarPlugin;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;
