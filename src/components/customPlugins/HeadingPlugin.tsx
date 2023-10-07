import styled from 'styled-components';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

const HeadingPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const makeSelectionHeading = (headingType: HeadingTagType): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingType));
      }
    });
  };

  const makeSelectionParagraph = (): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const headingTypes = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  return (
    <SelectWrapper
      onChange={(evt) => {
        if (evt.target.value === 'p') {
          makeSelectionParagraph();
        } else {
          makeSelectionHeading(evt.target.value as HeadingTagType);
        }
      }}
      className="rich-editor-select"
    >
      {headingTypes.map((htype) => {
        return (
          <option
            value={htype}
            key={htype}
            className={`rich-editor-option-${htype}`}
          >
            {htype}
          </option>
        );
      })}
    </SelectWrapper>
  );
};
export default HeadingPlugin;

const SelectWrapper = styled.select``;
