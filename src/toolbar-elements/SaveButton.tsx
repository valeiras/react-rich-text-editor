import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BiSolidSave } from 'react-icons/bi';
import { $generateHtmlFromNodes } from '@lexical/html';

const SaveButton = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const saveEditorState = async () => {
    const editorState = editor.getEditorState();
    const json = editorState.toJSON();
    console.log(json);

    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      console.log(htmlString);
    });
  };

  return (
    <button className="toolbar-btn" onClick={saveEditorState} title="Guardar">
      <BiSolidSave />
    </button>
  );
};
export default SaveButton;
