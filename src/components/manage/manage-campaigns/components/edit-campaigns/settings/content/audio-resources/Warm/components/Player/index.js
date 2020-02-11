import React, { useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
const Text = styled(Typography)`
  font-size: 16px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444851;
`;

const Link = styled(Text)`
  text-decoration: underline;
  font-size: 14px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444851;
`;
const PlayerContainer = styled.div``;

const Player = props => {
  let audioPlayer = useRef();

  useEffect(() => {
    audioPlayer.current.src = props.src;
    audioPlayer.current.load();
    audioPlayer.current.play();
  }, [props]);

  useEffect(() => {
    props.play && autoPlayer();
  });

  function closePlayer() {
    props.player(false);
  }

  function autoPlayer() {
    audioPlayer.current.play();
  }

  return (
    <>
      <PlayerContainer>
        <Link
          onClick={e => closePlayer()}
          style={{
            marginBottom: "14px",
            cursor: "pointer"
          }}
        >
          Close
        </Link>
        <audio ref={audioPlayer} controls style={{ width: "365px" }}>
          <source src={props.src} type="audio/mpeg" /> Your browser does not
          support the audio element.
        </audio>
      </PlayerContainer>
    </>
  );
};
export default Player;
