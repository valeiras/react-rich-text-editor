import ColorPicker from './ColorPicker';
import { BiFontColor } from 'react-icons/bi';

const TextColorPicker = ({ fontColor }: { fontColor: string }): JSX.Element => {
  return (
    <ColorPicker
      currColor={fontColor}
      propertyName="color"
      icon={<BiFontColor />}
    />
  );
};
export default TextColorPicker;
