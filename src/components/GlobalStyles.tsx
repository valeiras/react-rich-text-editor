import { ReactNode } from 'react';
import styled from 'styled-components';
const GlobalStyles = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};
export default GlobalStyles;

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  --toolbar-height: 2.2rem;

  font-family: Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: #222;
  background-color: #fff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  --border-color: #888;
  --disabled-color: #aaa;
  --default-border: 1px solid var(--border-color);
  --secondary-font-color: #3e3877;
  --main-bg-color: #fff;
  --light-grey: #f7f7f7;
  --dark-grey: #eee;
  --border-radius: 5px;
  --default-padding: 0.3rem;
  --editor-padding: 1rem;

  /* box shadow*/
  --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  .toolbar-btn-strip {
    display: flex;
    flex-direction: row;
    gap: 0.1rem;
  }

  .toolbar-btn {
    border-radius: var(--border-radius);
    cursor: pointer;
    background-color: transparent;
    font-weight: 400;
    font-size: 1.2rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
  }

  .active-btn,
  .toolbar-btn:hover {
    background-color: var(--dark-grey);
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
