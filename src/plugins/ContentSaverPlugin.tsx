/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import DOMPurify from "dompurify";

const ContentSaverPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const saveEditorState = () => {
    editor.update(() => {
      const htmlString = DOMPurify.sanitize($generateHtmlFromNodes(editor, null));
      console.log(htmlString);
    });
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
