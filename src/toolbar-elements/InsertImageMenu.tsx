import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useImageMenuContext } from './InsertImageButton';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  INSERT_IMAGE_COMMAND,
  InsertImagePayload,
} from '../plugins/ImagesPlugin';
import axios from 'axios';
// import { toast } from 'react-toastify';

const url = 'https://www.comparalux.es/app/webExterna/fotoBlog.php';

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
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  if (error) {
    console.log(error);
    return (
      <div className="images-selector">Parece que ha habido un error...</div>
    );
  }

  return (
    <div className="image-selector">
      <h4 className="title">Imágenes:</h4>
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
    const imagePayload: InsertImagePayload = { src: image, altText: '' };
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, imagePayload);
    if (setShowImageMenu) {
      setShowImageMenu(false);
    }
  };

  return (
    <div className="image-list-container">
      {data.result !== 'ok' ? (
        <p>Todavía no hay ninguna imagen en el servidor</p>
      ) : (
        <div className="image-list" id="image-list">
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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (form: FormData) => {
      return axios.post(url, form);
    },
    onSuccess: async () => {
      const imageList = document.getElementById('image-list');
      imageList?.scroll({ top: 0, behavior: 'smooth' });
      console.log(imageList);

      return await queryClient.invalidateQueries({ queryKey: ['serverImgs'] });
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file) => {
        try {
          const form = new FormData();
          form.append('file', file, file.name);
          await mutation.mutateAsync(form);
        } catch (error) {
          console.log(error);
        }
      });
    },
    [mutation]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });
  return (
    <div className="image-input">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="fake-img-input">
          <p>
            Arrastra o haz
            <span className="fake-btn"> click aquí</span> para subir una nueva
            imagen
          </p>
        </div>
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  --menu-width: 200px;

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
    height: var(--menu-width);
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
