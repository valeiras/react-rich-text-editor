import styled from 'styled-components';
// import { PlainEditor } from './components';
// import { RichEditor } from './components';
import { ContentTable } from './components';

function App(): JSX.Element {
  return (
    <Wrapper className="App">
      {/* <PlainEditor /> */}
      {/* <RichEditor /> */}
      <ContentTable />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  padding: 2rem 0;
`;
