import styled from 'styled-components';
import { ContentTable } from './components';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <Wrapper className="App">
      <ToastContainer position="top-center" transition={Slide} />
      <h1 className="app-title">Ennubo text editor</h1>
      <ContentTable />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  padding: 2rem 0;

  h1.app-title {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 2.5rem;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto 2rem;
    width: 90%;
  }
`;
