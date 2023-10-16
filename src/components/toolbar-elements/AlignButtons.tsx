import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ElementFormatType, FORMAT_ELEMENT_COMMAND } from 'lexical';
import {
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiAlignJustify,
} from 'react-icons/bi';
import type { ReactNode } from 'react';

const AlignButtons = ({
  elementFormat,
}: {
  elementFormat: ElementFormatType;
}): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const elementFormats: {
    format: ElementFormatType;
    icon: ReactNode;
    isActive: boolean;
    title: string;
  }[] = [
    {
      format: 'left',
      icon: <BiAlignLeft />,
      isActive: elementFormat === 'left',
      title: 'Alineación izquierda',
    },
    {
      format: 'center',
      icon: <BiAlignMiddle />,
      isActive: elementFormat === 'center',
      title: 'Centrado',
    },
    {
      format: 'right',
      icon: <BiAlignRight />,
      isActive: elementFormat === 'right',
      title: 'Alineación derecha',
    },
    {
      format: 'justify',
      icon: <BiAlignJustify />,
      isActive: elementFormat === 'justify',
      title: 'Justificado',
    },
  ];
  return (
    <div className="toolbar-btn-strip">
      {elementFormats.map(({ format, icon, isActive, title }) => {
        return (
          <button
            className={isActive ? 'toolbar-btn active-btn' : 'toolbar-btn'}
            title={title}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
            }}
            key={format}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};
export default AlignButtons;
