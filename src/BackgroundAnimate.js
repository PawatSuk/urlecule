import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const cube = keyframes`
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
`;

const BackgroundContainer = styled.ul`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #2ead5f;
  overflow: hidden;
  z-index: -1;
  list-style: none;
`;

const Cube = styled.li`
  position: absolute;
  width: 10px;
  height: 10px;
  border: solid 1px #2ece6c;
  color: transparent;

  top: ${(props) => props.top};
  left: ${(props) => props.left};
  border-color: ${(props) => props.border || "#2ece6c"};

  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: ${cube} 7s ease-in forwards infinite;
  animation-delay: ${(props) => props.delay};
`;

const AnimatedBackground = () => {
  // cube configuration list
  const cubes = [
    { delay: "0s",  top: "61vh", left: "57vw", border: "#39fb84" },
    { delay: "2s",  top: "24vh", left: "19vw" },
    { delay: "4s",  top: "87vh", left: "42vw" },
    { delay: "6s",  top: "77vh", left: "87vw" },
    { delay: "8s",  top: "44vh", left: "13vw", border: "#39fb84" },
    { delay: "10s", top: "8vh",  left: "76vw" },
  ];

  return (
    <BackgroundContainer>
      {cubes.map((c, i) => (
        <Cube
          key={i}
          delay={c.delay}
          top={c.top}
          left={c.left}
          border={c.border}
        />
      ))}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;
