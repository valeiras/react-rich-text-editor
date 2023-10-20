import { ReactNode } from 'react';
import styled from 'styled-components';
const GlobalStyles = ({ children }: { children: ReactNode }) => {
  return <Wrapper className="GlobalStyles">{children}</Wrapper>;
};
export default GlobalStyles;

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  line-height: 1.5;
  font-weight: 400;

  --toolbar-height: 2.2rem;

  color-scheme: light dark;
  color: #222;
  background-color: #fff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  p {
    margin: 0;
  }

  .content-editable {
    height: 100%;
    width: 100%;
    outline: none;
    border-radius: var(--border-radius);
    padding: var(--default-padding) var(--editor-padding);
    background-color: white;
    font-family: Arial;
  }

  .rich-editor-select {
    border-radius: var(--border-radius);
    border: none;
    font-family: Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    background-color: transparent;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .rich-editor-select.narrow-select {
    max-width: 5rem;
  }

  .rich-editor-banner {
    background-color: red;
    color: blue;
    margin: 0.5rem;
    display: flex;
    width: fit-content;
    padding: 1rem;
    border-radius: var(--border-radius);
  }
`;
