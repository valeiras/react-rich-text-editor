import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_BANNER_COMMAND } from '../banner/BannerPlugin';

const InsertBannerButton = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      className="toolbar-btn"
      onClick={() => {
        editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
      }}
    >
      Banner
    </button>
  );
};
export default InsertBannerButton;
