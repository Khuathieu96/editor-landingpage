import React, { useEffect } from 'react';
import { Howl } from 'howler';

const sound = new Howl({
  src: ['/music/musicBackground.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5,
  onend: function () {
    console.log('Finished!');
  },
  pool: 5,
  // onpause: () => {},
});

const MusicBackground = () => {
  useEffect(() => {
    // console.log('ádfasdf', sound);
    sound.play();
  }, []);
  return <></>;
};

export default MusicBackground;
