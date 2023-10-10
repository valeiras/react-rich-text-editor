import ColorPicker from './ColorPicker';
import { BiSolidColorFill } from 'react-icons/bi';

const BgColorPicker = ({ bgColor }: { bgColor: string }): JSX.Element => {
  return (
    <ColorPicker
      currColor={bgColor}
      propertyName="background-color"
      icon={<BiSolidColorFill />}
    />
  );
};
export default BgColorPicker;
