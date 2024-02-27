import StyleDropDown from "./StyleDropDown";

const fontSizes = [...Array(9).keys()]
  .map((x) => `${(0.2 * x + 0.2).toFixed(1)}rem`)
  .concat([...Array(5).keys()].map((x) => `${(0.5 * x + 2).toFixed(1)}rem`));

const FontSizeDropDown = ({ selectionFontSize }: { selectionFontSize: string }): JSX.Element => {
  console.log(selectionFontSize);
  return <StyleDropDown currValue={selectionFontSize} availableValues={fontSizes} propertyName="font-size" />;
};
export default FontSizeDropDown;
