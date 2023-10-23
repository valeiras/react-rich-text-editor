import { HiTableCells } from 'react-icons/hi2';
import { useState, useEffect } from 'react';
import InsertTableMenu from './InsertTableMenu';
import { SELECTION_CHANGE_COMMAND } from 'lexical';
import { LOW_PRIORITY } from '../utils/constants';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const InsertTableButton = (): JSX.Element => {
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        setShowTableMenu(false);
        return true;
      },
      LOW_PRIORITY
    );
  }, [editor]);

  return (
    <div className="InsertMenuButton">
      <button
        onClick={() => {
          setShowTableMenu(!showTableMenu);
        }}
        className="toolbar-btn"
      >
        <HiTableCells />
      </button>
      {showTableMenu && <InsertTableMenu />}
    </div>
  );
};
export default InsertTableButton;
