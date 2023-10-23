import styled from 'styled-components';

import { useEffect, useCallback, useState } from 'react';
import { $getNearestNodeOfType } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  ElementFormatType,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $isLinkNode } from '@lexical/link';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';

import {
  HeadingTypeDropDown,
  InsertListButtons,
  TextStylingButtons,
  FontFamilyDropDown,
  FontSizeDropDown,
  BgColorPicker,
  TextColorPicker,
  InsertLinkButton,
  InsertImageButton,
} from '../toolbar-elements';

import getSelectedNode from '../utils/getSelectedNode';
import { LOW_PRIORITY } from '../utils/constants';
import EmbedButtons from '../toolbar-elements/EmbedButtons';
import AlignButtons from '../toolbar-elements/AlignButtons';

const ToolbarPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');
  const [isBold, setIsBold] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontSize, setFontSize] = useState('1,0rem');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');
  const [fontColor, setFontColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');

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
        $getSelectionStyleValueForProperty(selection, 'font-size', '1.0 rem')
      );
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial')
      );
      setFontColor(
        $getSelectionStyleValueForProperty(selection, 'color', '#000000')
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          '#ffffff'
        )
      );

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      // console.log(node);
      // Update text align
      setElementFormat(
        ($isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType()) || 'left'
      );
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LOW_PRIORITY
      )
    );
  }, [editor, updateToolbar]);

  return (
    <Wrapper className="ToolbarPlugin">
      <HeadingTypeDropDown blockType={blockType} />
      <Divider />
      <FontSizeDropDown selectionFontSize={fontSize} />
      <Divider />
      <FontFamilyDropDown selectionFontFamily={fontFamily} />
      <Divider />

      <TextStylingButtons
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isStrikethrough={isStrikethrough}
      />
      <Divider />
      <BgColorPicker bgColor={bgColor} />
      <TextColorPicker fontColor={fontColor} />
      <Divider />
      <AlignButtons elementFormat={elementFormat} />
      <Divider />
      <InsertLinkButton isLink={isLink} />
      <EmbedButtons />
      <InsertImageButton />
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
  column-gap: 0.2rem;
  row-gap: 0.5rem;
  align-items: stretch;
  border-bottom: 1px solid #bbb;
  padding: var(--default-padding);
  /* position: relative; */
`;

const Divider = styled.div`
  width: 1px;
  background-color: #bbb;
  margin: 0 0.25rem;
`;
