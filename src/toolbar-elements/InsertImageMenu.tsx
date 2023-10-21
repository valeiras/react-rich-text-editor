import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useQuery } from '@tanstack/react-query';
import { useImageMenuContext } from './InsertImageButton';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  INSERT_IMAGE_COMMAND,
  InsertImagePayload,
} from '../plugins/ImagesPlugin';

const InsertImageMenu = () => {
  return (
    <Wrapper className="image-menu">
      <ImageSelector />
      <ImageInput />
    </Wrapper>
  );
};
export default InsertImageMenu;

const ImageSelector = (): JSX.Element => {
  const { isPending, error, data } = useQuery({
    queryKey: ['serverImgs'],
    queryFn: () =>
      fetch('https://www.comparalux.es/app/webExterna/fotoBlog.php').then(
        (res) => res.json()
      ),
  });

  if (error) {
    console.log(error);
    return (
      <div className="images-selector">Parece que ha habido un error...</div>
    );
  }

  return (
    <div className="image-selector">
      <h4 className="title">Imágenes disponibles:</h4>
      {isPending ? (
        <div className="loading-container">
          <div className="loading-indicator"></div>
        </div>
      ) : (
        <ImageList data={data} />
      )}
    </div>
  );
};

type pictureType = {
  id: string;
  image: string;
  name: string;
  thumbnail: string;
  width: string;
  height: string;
};
type dataType = { result: string; pictures: pictureType[] };

const ImageList = ({ data }: { data: dataType }): JSX.Element => {
  const { pictures } = data;
  const { setShowImageMenu } = useImageMenuContext();
  const [editor] = useLexicalComposerContext();

  const insertImage = (image: string) => {
    console.log(image);
    const imagePayload: InsertImagePayload = { src: image, altText: '' };
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, imagePayload);
    if (setShowImageMenu) {
      setShowImageMenu(false);
    }
  };

  return (
    <div className="image-list-container">
      {data.pictures.length === 0 ? (
        <p>Todavía no hay ninguna imagen en el servidor</p>
      ) : (
        <div className="image-list">
          {pictures.map(({ thumbnail, name, id, image }) => {
            return (
              <button key={id} className="invisible-btn image-btn">
                <img
                  src={thumbnail}
                  alt={name}
                  className="image-item"
                  onClick={() => insertImage(image)}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ImageInput = (): JSX.Element => {
  const { getRootProps, getInputProps } = useDropzone();
  return (
    <div className="image-input">
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

const Wrapper = styled.div`
  --menu-width: 250px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--menu-width);
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

  p {
    font-size: 0.9rem;
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
    padding: var(--default-padding) 1rem;
    cursor: pointer;
  }
  .fake-img-input p {
    text-align: center;
  }

  .fake-img-input,
  h4.title {
    margin-bottom: 0.25rem;
  }

  .image-selector {
    width: 100%;
  }

  .loading-container {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    justify-content: center;
  }

  .image-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(1.5 * var(--menu-width));
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    gap: 1rem;
  }

  .image-list::-webkit-scrollbar {
    display: none;
  }

  .image-item {
    width: 100%;
  }

  .image-btn {
    cursor: pointer;
  }
`;
