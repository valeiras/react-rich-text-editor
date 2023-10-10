import StyleDropDown from './StyleDropDown';

const fontSizes = [...Array(6).keys()]
  .map((x) => `${x + 5}px`)
  .concat([...Array(5).keys()].map((x) => `${2 * x + 12}px`))
  .concat([...Array(5).keys()].map((x) => `${4 * x + 24}px`));

const FontSizeDropDown = ({
  selectionFontSize,
}: {
  selectionFontSize: string;
}): JSX.Element => {
  return (
    <StyleDropDown
      currValue={selectionFontSize}
      availableValues={fontSizes}
      propertyName="font-size"
    />
  );
};
export default FontSizeDropDown;
