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

  const styleTags: {
    tag: StyleTag;
    icon: ReactNode;
    isActive: boolean;
    title: string;
  }[] = [
    {
      tag: 'bold',
      icon: <BiBold />,
      isActive: isBold,
      title: 'Negrita (ctrl+b)',
    },
    {
      tag: 'italic',
      icon: <BiItalic />,
      isActive: isItalic,
      title: 'Cursiva (ctrl+i)',
    },
    {
      tag: 'underline',
      icon: <BiUnderline />,
      isActive: isUnderline,
      title: 'Subrayado (ctrl+u)',
    },
    {
      tag: 'strikethrough',
      icon: <BiStrikethrough />,
      isActive: isStrikethrough,
      title: 'Tachado',
    },
  ];

  return (
    <div className="toolbar-btn-strip">
      {styleTags.map(({ tag, icon, isActive, title }) => {
        return (
          <button
            className={isActive ? 'toolbar-btn active-btn' : 'toolbar-btn'}
            title={title}
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
