import styled from 'styled-components';
import { rows } from '../data/temp-data';
import { PlainEditor, RichEditor } from '.';
import { nanoid } from 'nanoid';

const ContentTable = (): JSX.Element => {
  return (
    <Wrapper className="ContentTable">
      {rows.map((item) => {
        return <Row {...item} key={nanoid()}></Row>;
      })}
    </Wrapper>
  );
};
export default ContentTable;

const Row = ({
  name,
  typeOfInput,
}: {
  name: string;
  typeOfInput: string;
}): JSX.Element => {
  return (
    <>
      <div className="row-name" key={nanoid()}>
        {name}:
      </div>
      <div className="editor-container" key={nanoid()}>
        {typeOfInput === 'rich' ? <RichEditor /> : <PlainEditor />}
      </div>
    </>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto;
  border-radius: var(--border-radius);

  border: 1px solid var(--border-color);
  background-color: var(--main-bg-color);

  .row-name {
    padding: 1rem;
    padding-top: calc(1rem + var(--text-padding));
  }

  overflow: hidden;

  .editor-container {
    padding: 1rem;
  }
  & > :nth-child(4n + 3),
  & > :nth-child(4n + 4) {
    background-color: var(--light-grey);
  }
`;
