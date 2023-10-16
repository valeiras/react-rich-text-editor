import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EmbedConfigs } from '../AutoEmbedPlugin';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';

const EmbedButtons = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      {EmbedConfigs.map((embedConfig) => (
        <button
          className="toolbar-btn"
          key={embedConfig.type}
          onClick={() => {
            editor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type);
          }}
        >
          {embedConfig.icon}
        </button>
      ))}
    </>
  );
};
export default EmbedButtons;
