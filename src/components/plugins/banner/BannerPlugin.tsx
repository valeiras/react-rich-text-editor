/* eslint-disable react-refresh/only-export-components */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type {
  EditorConfig,
  NodeKey,
  LexicalNode,
  RangeSelection,
} from 'lexical';
import {
  createCommand,
  COMMAND_PRIORITY_NORMAL,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  ElementNode,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';

export class BannerNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
  }

  static getType(): string {
    return 'banner';
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('div');
    element.className = config.theme.banner;
    return element;
  }

  updateDOM(): false {
    return false;
  }

  collapseAtStart() {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }

  insertNewAfter(_: RangeSelection, restoreSelection: boolean) {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }
}

export function $createBannerNode(): BannerNode {
  return new BannerNode();
}

export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner');

export function BannerPlugin(): null {
  const [editor] = useLexicalComposerContext();

  if (!editor.hasNode(BannerNode)) {
    throw new Error('BannerPlugin: BannerNode not registered on editor');
  }

  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    insertBanner,
    COMMAND_PRIORITY_NORMAL
  );
  return null;
}

const insertBanner = () => {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    // $patchStyleText(selection, { color: 'blue' });
    $setBlocksType(selection, $createBannerNode);
  }
  return true;
};
