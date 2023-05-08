import { CSSProperties } from "react";
import React from "react";


type EmbedItem = {
  id: string;
  title?: string;
};

const videoDivStyles: CSSProperties = {
  position: "relative",
  width: "fit-content",
  height: "fit-content",
};

const aStyles: CSSProperties = {
  position: "absolute",
  top: 20,
  right: "1rem",
  opacity: 0.8,
};

const titleStyles: CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: 'bolder'

}

export default function EmbedVideo({ id, title }: EmbedItem) {
  const fullUrl = `https://player.vimeo.com/video/${id}?h=e031fbcf01&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`;

  return (
    <div style={videoDivStyles}>
      <p style={titleStyles}>Review of Steps {title}</p>
      <iframe
        allow="autoplay;"
        allowFullScreen
        style={{ border: "none" }}
        src={fullUrl}
        width="640"
        height="360"
      ></iframe>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
}
/*
<div style="padding:75% 0 0 0;position:relative;">
    <iframe src="https://player.vimeo.com/video/814286011?h=e031fbcf01&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen 
    style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Untitled video (2).mp4">
    </iframe>
    </div>
    <script src="https://player.vimeo.com/api/player.js"></script>
*/
