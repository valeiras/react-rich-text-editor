import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $patchStyleText } from '@lexical/selection';

const fontSizes = [...Array(16).keys()].map((x) => `${x + 7}px`);
console.log(fontSizes);

const FontSizeDropDown = ({ fontSize }: { fontSize: string }): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const setSelectionFontSize = (size: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          'font-size': size,
        });
      }
    });
  };
  return (
    <select
      className="rich-editor-select"
      value={fontSize}
      onChange={(evt) => {
        setSelectionFontSize(evt.target.value);
      }}
    >
      {fontSizes.map((size) => {
        return (
          <option value={size} key={size}>
            {size}
          </option>
        );
      })}
    </select>
  );
};
export default FontSizeDropDown;
