import styled from 'styled-components';
import { PiListNumbers, PiListBullets } from 'react-icons/pi';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ReactNode } from 'react';

type ListTag = 'ol' | 'ul';

const InsertListButtons = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const listTags: { tag: ListTag; icon: ReactNode; title: string }[] = [
    { tag: 'ol', icon: <PiListNumbers />, title: 'Insertar lista numerada' },
    { tag: 'ul', icon: <PiListBullets />, title: 'Insertar lista' },
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
    <Wrapper className="InsertListButtons toolbar-btn-strip">
      {listTags.map(({ tag, icon, title }) => {
        return (
          <button
            className="toolbar-btn list-btn"
            onClick={() => {
              makeSelectionList(tag);
            }}
            title={title}
            key={tag}
          >
            {icon}
          </button>
        );
      })}
    </Wrapper>
  );
};
export default InsertListButtons;

const Wrapper = styled.div`
  .list-btn {
    font-size: 1.2rem;
  }
`;
