import StyleDropDown from './StyleDropDown';

const fontFamilies = [
  'Arial',
  'Courier New',
  'Georgia',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
];

const FontFamilyDropDown = ({
  selectionFontFamily,
}: {
  selectionFontFamily: string;
}): JSX.Element => {
  return (
    <StyleDropDown
      currValue={selectionFontFamily}
      availableValues={fontFamilies}
      propertyName="font-family"
    />
  );
};
export default FontFamilyDropDown;
