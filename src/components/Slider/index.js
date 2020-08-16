import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Slider = ({ photos, children, width, height }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const next = () =>
    setPhotoIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  const prev = () =>
    setPhotoIndex((i) => (i === 0 ? photos.length - 1 : i - 1));

  useEffect(() => {
    if (children) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Container width={width} height={height}>
      {children ? (
        <Content>{children}</Content>
      ) : (
        <Controls>
          <Button onClick={prev}>p</Button>
          <Button onClick={next}>n</Button>
        </Controls>
      )}
      <Background photo={photos[photoIndex]} overlay={children} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background: #cbd5e0;
`;

const Content = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 40px;
  left: 30px;
  right: 30px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: ${(props) =>
    props.overlay
      ? `linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7)), url(${props.photo})`
      : `url(${props.photo})`};
  background-size: cover;
`;

const Controls = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 14px;
  bottom: 0;
  left: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 0 8px 0 rgba(0, 0, 0, 0.08);
  background: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;

export default Slider;
