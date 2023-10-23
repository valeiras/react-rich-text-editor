import styled from 'styled-components';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { SyntheticEvent } from 'react';

const InsertTableMenu = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const handleSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: evt.currentTarget.columns.value,
      rows: evt.currentTarget.rows.value,
    });
  };

  return (
    <Wrapper className="InsertTableMenu">
      <form method="post" onSubmit={handleSubmit}>
        <div className="grid-container">
          <label htmlFor="columns">Columnas:</label>
          <input type="number" name="columns" defaultValue={1} min={1} />
          <label htmlFor="rows">Filas:</label>
          <input type="number" name="rows" defaultValue={1} min={1} />
        </div>
        <button type="submit" className="btn">
          Insertar tabla
        </button>
      </form>
    </Wrapper>
  );
};
export default InsertTableMenu;

const Wrapper = styled.div`
  /* --menu-width: 300px; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  border: var(--default-border);
  background-color: white;
  border-radius: var(--border-radius);
  padding: 0.5rem 2rem;
  margin-top: var(--default-padding);
  box-shadow: var(--shadow-1);
  transform: translate(-50%, 5px);
  gap: 1rem;

  .grid-container {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
  }

  input {
    font-size: 1rem;
    padding: 0.2rem;
    text-align: center;
    outline: none;
    width: 3rem;
    border: var(--default-border);
    border-radius: var(--border-radius);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;
