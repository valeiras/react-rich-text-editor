import { BiBold, BiItalic, BiUnderline, BiStrikethrough } from 'react-icons/bi';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { ReactNode } from 'react';
import { FORMAT_TEXT_COMMAND } from 'lexical';

type StyleTag = 'bold' | 'underline' | 'italic' | 'strikethrough';

const TextStylingButtons = ({
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
}: {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
}): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const styleTags: { tag: StyleTag; icon: ReactNode; isActive: boolean }[] = [
    { tag: 'bold', icon: <BiBold />, isActive: isBold },
    { tag: 'italic', icon: <BiItalic />, isActive: isItalic },
    { tag: 'underline', icon: <BiUnderline />, isActive: isUnderline },
    {
      tag: 'strikethrough',
      icon: <BiStrikethrough />,
      isActive: isStrikethrough,
    },
  ];

  return (
    <div className="toolbar-btn-strip">
      {styleTags.map(({ tag, icon, isActive }) => {
        return (
          <button
            className={isActive ? 'toolbar-btn active-btn' : 'toolbar-btn'}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, tag);
            }}
            key={tag}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};
export default TextStylingButtons;
