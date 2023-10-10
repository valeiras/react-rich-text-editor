import styled from 'styled-components';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $patchStyleText, $setBlocksType } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const HeadingTypeDropDown = ({
  blockType,
}: {
  blockType: string;
}): JSX.Element => {
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

  const headingTypes = [
    { text: 'Párrafo', tag: 'p' },
    { text: 'Título 1', tag: 'h1' },
    { text: 'Título 2', tag: 'h2' },
    { text: 'Título 3', tag: 'h3' },
    { text: 'Título 4', tag: 'h4' },
    { text: 'Título 5', tag: 'h5' },
    { text: 'Título 6', tag: 'h6' },
  ];

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
      value={blockType}
    >
      {headingTypes.map(({ text, tag }) => {
        return (
          <option value={tag} key={tag} className={`rich-editor-option-${tag}`}>
            {text}
          </option>
        );
      })}
    </SelectWrapper>
  );
};
export default HeadingTypeDropDown;

const SelectWrapper = styled.select`
  .rich-editor-option-h1 {
    font-size: 1.5rem;
    height: 1rem;
  }
  .rich-editor-option-h2 {
    font-size: 1.4rem;
    height: 1rem;
  }
  .rich-editor-option-h3 {
    font-size: 1.3rem;
    height: 1rem;
  }
  .rich-editor-option-h4 {
    font-size: 1.2rem;
    height: 1rem;
  }
  .rich-editor-option-h5 {
    font-size: 1.1rem;
    height: 1rem;
  }
  .rich-editor-option-h6 {
    font-size: 1rem;
    height: 1rem;
  }
`;
