import styled from 'styled-components';
import { BiImageAlt } from 'react-icons/bi';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const InsertImageButton = () => {
  const [showAvailableImages, setShowAvailableImages] = useState(false);

  const ImageInput = () => {
    const { getRootProps, getInputProps } = useDropzone();

    return (
      <div className="image-input">
        <h4>Subida:</h4>
        <div {...getRootProps()}>
          <input {...getInputProps({ accept: 'images/*' })} />
          <div className="fake-img-input">
            <p>
              Arrastra una imagen o haz
              <span className="fake-btn"> click aquí</span> para subirla
            </p>
          </div>
        </div>
      </div>
    );
  };

  const AvailableImages = () => {
    return (
      <div className="available-images">
        <h4>Imágenes disponibles:</h4>
        <p>Por ahora no hay ninguna imagen en el servidor</p>
      </div>
    );
  };

  return (
    <Wrapper className="InsertImageButton">
      <button
        className="toolbar-btn"
        onClick={() => {
          setShowAvailableImages(!showAvailableImages);
        }}
      >
        <BiImageAlt />
      </button>
      {showAvailableImages && (
        <div className="image-menu">
          <AvailableImages />
          <ImageInput />
        </div>
      )}
    </Wrapper>
  );
};
export default InsertImageButton;

const Wrapper = styled.div`
  p {
    font-size: 0.9rem;
  }

  .image-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    z-index: 10;
    border: var(--default-border);
    background-color: white;
    border-radius: var(--border-radius);
    padding: 0.5rem 1rem;
    margin-top: var(--default-padding);
    box-shadow: var(--shadow-1);
  }

  .image-input {
    width: 100%;
  }

  .fake-btn {
    font-weight: 600;
    cursor: pointer;
  }

  .fake-img-input {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed red;
    height: 150px;
    border-radius: var(--border-radius);
    background-color: rgba(255, 0, 0, 0.2);
    /* color: rgba(0, 0, 0, 0.6); */
    padding: var(--default-padding) 1rem;
    cursor: pointer;
  }
  .fake-img-input p {
    text-align: center;
  }

  .fake-img-input,
  h4 {
    margin-bottom: 0.5rem;
  }
`;
