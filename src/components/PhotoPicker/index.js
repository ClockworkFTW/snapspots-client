import React, { useState } from "react";
import styled from "styled-components";

import Gallery from "../Places/Gallery";

const PhotoPicker = ({ photos, setPhotos }) => {
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState(null);

  const disabled = !photo || photos.length > 9;

  const addPhoto = () => {
    if (photos.find((url) => url === photo)) {
      setError("Image already exists");
    } else {
      setError(null);
      setPhotos([photo, ...photos]);
      setPhoto("");
    }
  };

  const removePhoto = (url) => {
    setPhotos(photos.filter((photo) => photo !== url));
  };

  const errorPhoto = (url) => {
    setError("Image could not be found");
    removePhoto(url);
  };

  return (
    <Container>
      {error && <h1>{error}</h1>}
      <Group>
        <Input
          type="text"
          placeholder="E.g. http://mywebsite/myimage.jpg"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <Button disabled={disabled} onClick={addPhoto}>
          add
        </Button>
      </Group>
      <Gallery
        photos={photos}
        name="preview"
        onClick={removePhoto}
        onError={errorPhoto}
      />
    </Container>
  );
};

const Container = styled.div``;

const Group = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button``;

const Preview = styled.div``;

const Image = styled.img`
  width: 200px;
  height: auto;
  &:hover {
    cursor: pointer;
  }
`;

export default PhotoPicker;
