import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isNodeSelection, $isRangeSelection, ElementFormatType, FORMAT_ELEMENT_COMMAND } from "lexical";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiAlignJustify, BiLaptop } from "react-icons/bi";
import type { ReactNode } from "react";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";

const AlignButtons = ({ elementFormat }: { elementFormat: ElementFormatType }): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const elementFormats: {
    format: ElementFormatType;
    icon: ReactNode;
    isActive: boolean;
    title: string;
  }[] = [
    {
      format: "start",
      icon: <BiLaptop />,
      isActive: elementFormat === "start",
      title: "Alineación responsiva: justificado en pantalla grande, izquierda en móvil",
    },
    {
      format: "left",
      icon: <BiAlignLeft />,
      isActive: elementFormat === "left",
      title: "Alineación izquierda",
    },
    {
      format: "center",
      icon: <BiAlignMiddle />,
      isActive: elementFormat === "center",
      title: "Centrado",
    },
    {
      format: "right",
      icon: <BiAlignRight />,
      isActive: elementFormat === "right",
      title: "Alineación derecha",
    },
    {
      format: "justify",
      icon: <BiAlignJustify />,
      isActive: elementFormat === "justify",
      title: "Justificado",
    },
  ];

  const clearFormat = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || $isNodeSelection(selection)) {
        const nodes = selection.getNodes();
        for (const node of nodes) {
          if ($isDecoratorBlockNode(node)) {
            const self = node.getWritable();
            self.__format = "left";
          } else {
            const element = $getNearestBlockElementAncestorOrThrow(node);
            const self = element.getWritable();
            self.__format = 0;
          }
        }
      }
    });
  };

  return (
    <div className="toolbar-btn-strip">
      {elementFormats.map(({ format, icon, isActive, title }) => {
        return (
          <button
            className={isActive ? "toolbar-btn active-btn" : "toolbar-btn"}
            title={title}
            onClick={() => {
              if (format === "start") {
                clearFormat();
              } else {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
              }
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
