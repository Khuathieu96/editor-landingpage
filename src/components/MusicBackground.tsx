import React from 'react';
import { Howl } from 'howler';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { Button } from 'antd';

const sound = new Howl({
  src: [
    '/music/Comethru.mp3',
    '/music/You_re Beautiful.mp3',
    '/music/City Of Angels.mp3',
    // '/music/Good Morning.mp3',
    // '/music/In My Dreams.mp3',
    // '/music/Me 2 (Feat. Julian Avila).mp3',
    // '/music/Summertime Love.mp3',
    // '/music/The Process.mp3',
    // '/music/musicBackground.mp3',
  ],
  loop: true,
  volume: 0.5,

  // onpause: () => {},
});

const MusicBackground = () => {
  return (
    <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
      <Button
        // type='primary'
        shape='circle'
        icon={sound.playing() ? <SoundFilled /> : <SoundOutlined />}
        onClick={() => {
          // console.log('sound', sound);
          if (sound.playing()) {
            sound.pause();
          } else sound.play();
        }}
      />
    </div>
  );
};

export default MusicBackground;
