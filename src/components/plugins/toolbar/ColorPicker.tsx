import styled from 'styled-components';

import type { ReactNode } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $patchStyleText } from '@lexical/selection';

const ColorPicker = ({
  currColor,
  propertyName,
  icon,
}: {
  currColor: string;
  propertyName: string;
  icon: ReactNode;
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
    <Wrapper className="ColorPicker">
      <div className="icon-container">{icon}</div>
      <input
        type="color"
        name={propertyName}
        className="color-input"
        value={currColor}
        onChange={(evt) => {
          setSelectionPropertyValue(evt.target.value);
        }}
      />
    </Wrapper>
  );
};
export default ColorPicker;

const Wrapper = styled.div`
  position: relative;

  .icon-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    display: flex;
  }

  input {
    opacity: 0%;
    z-index: 2;
  }
`;
