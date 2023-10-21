/* eslint-disable react-refresh/only-export-components */
import { BiImageAlt } from 'react-icons/bi';
import { useState, useEffect, createContext, useContext } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { SELECTION_CHANGE_COMMAND } from 'lexical';
import { LOW_PRIORITY } from '../utils/constants';
import InsertImageMenu from './InsertImageMenu';

type ContextType = {
  setShowImageMenu: React.Dispatch<React.SetStateAction<boolean>> | null;
};
const ImageMenuContext = createContext<ContextType>({} as ContextType);

const InsertImageButton = (): JSX.Element => {
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        setShowImageMenu(false);
        return true;
      },
      LOW_PRIORITY
    );
  }, [editor]);

  return (
    <div className="InsertImageButton">
      <button
        className="toolbar-btn"
        onClick={() => {
          setShowImageMenu(!showImageMenu);
        }}
      >
        <BiImageAlt />
      </button>
      {showImageMenu && (
        <ImageMenuContext.Provider value={{ setShowImageMenu }}>
          <InsertImageMenu />
        </ImageMenuContext.Provider>
      )}
    </div>
  );
};
export default InsertImageButton;

export const useImageMenuContext = () => {
  return useContext(ImageMenuContext);
};
