import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $patchStyleText } from '@lexical/selection';

const StyleDropDown = ({
  currValue,
  availableValues,
  propertyName,
}: {
  currValue: string;
  availableValues: string[];
  propertyName: string;
}): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const setSelectionPropertyValue = (value: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          [propertyName]: value,
        });
      }
    });
  };
  return (
    <select
      className="rich-editor-select narrow-select"
      value={currValue}
      onChange={(evt) => {
        setSelectionPropertyValue(evt.target.value);
      }}
    >
      {availableValues.map((value) => {
        return (
          <option value={value} key={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
};
export default StyleDropDown;
