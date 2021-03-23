import React, { useEffect } from 'react';
import { Howl } from 'howler';

const sound = new Howl({
  src: [
    '/music/Blue Boi.mp3',
    '/music/Chill Day.mp3',
    '/music/City Of Angels.mp3',
    '/music/Good Morning.mp3',
    '/music/In My Dreams.mp3',
    '/music/Me 2 (Feat. Julian Avila).mp3',
    '/music/Summertime Love.mp3',
    '/music/The Process.mp3',
    '/music/musicBackground.mp3',
  ],
  autoplay: true,
  loop: true,
  volume: 0.5,

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
