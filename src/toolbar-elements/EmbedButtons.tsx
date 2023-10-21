import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EmbedConfigs } from '../plugins/AutoEmbedPlugin';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';

const EmbedButtons = (): JSX.Element => {
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
