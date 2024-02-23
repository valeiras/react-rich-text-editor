/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const ContentSaverPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const saveEditorState = () => {
    const editorState = JSON.stringify(editor.getEditorState());
    const internalEditorState = new CustomEvent("internal-editor-state", { detail: { editorState } });
    window.dispatchEvent(internalEditorState);
  };

  useEffect(() => {
    window.addEventListener("save-editor-state", saveEditorState);
    return () => {
      window.removeEventListener("save-editor-state", saveEditorState);
    };
  }, []);

  return <></>;
};

export default ContentSaverPlugin;
