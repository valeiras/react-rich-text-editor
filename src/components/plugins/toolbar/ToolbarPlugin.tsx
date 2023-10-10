import styled from 'styled-components';

import { useEffect, useCallback, useState } from 'react';
import { $getNearestNodeOfType } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';

import HeadingTypeDropDown from './HeadingTypeDropDown';
import InsertListButtons from './InsertListButtons';
import TextStylingButtons from './TextStylingButtons';
import FontSizeDropDown from './FontSizeDropDown';

const ToolbarPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');
  // const [isRTL, setIsRTL] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontSize, setFontSize] = useState('12px');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setFontSize(
        $getSelectionStyleValueForProperty(selection, 'font-size', '12px')
      );

      console.log(
        $getSelectionStyleValueForProperty(selection, 'font-size', '12px')
      );

      // setIsRTL($isParentElementRTL(selection));
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  return (
    <Wrapper className="ToolbarPlugin">
      <HeadingTypeDropDown blockType={blockType} />
      <Divider />
      <FontSizeDropDown fontSize={fontSize} />
      <Divider />
      <TextStylingButtons
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isStrikethrough={isStrikethrough}
      />
      <Divider />
      <InsertListButtons />
      <Divider />
    </Wrapper>
  );
};
export default ToolbarPlugin;

const Wrapper = styled.div`
  margin-bottom: 0.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.2rem;
  align-items: stretch;
  border-bottom: 1px solid #bbb;
  padding: var(--default-padding);
`;

const Divider = styled.div`
  width: 1px;
  background-color: #bbb;
  margin: 0 0.25rem;
`;
