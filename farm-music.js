(() => {
  'use strict';

  const preferenceKey = 'blueberryFarmBackgroundMusic';
  const buttonId = 'farm-background-music';
  const labels = {
    'zh-HK': ['♪ 音樂', '背景音樂已關閉，撳一下開啟', '背景音樂播放中，撳一下關閉'],
    'zh-CN': ['♪ 音乐', '音乐已暂停，点击播放', '背景音乐正在播放，点击暂停'],
    en: ['♪ Music', 'Background music off. Press to turn it on.', 'Background music playing. Press to turn it off.'],
    ja: ['♪ 音楽', 'BGMは停止中です。押すと再生します。', 'BGMを再生中です。押すと停止します。'],
    ko: ['♪ 음악', '배경 음악이 일시 정지되었습니다. 누르면 재생합니다.', '배경 음악 재생 중입니다. 누르면 일시 정지합니다.']
  };
  // Original instrumental phrases. Notes use MIDI pitch numbers.
  const pieces = [
    { bpm: 89, bars: [
      [48, [60,64,67,71], [72,null,76,79,76,null,74,null]],
      [43, [59,62,67,69], [74,null,79,81,79,null,74,null]],
      [45, [60,64,67,69], [72,76,null,81,79,76,74,null]],
      [41, [60,64,65,69], [72,null,69,null,76,77,76,null]],
      [48, [60,64,67,71], [79,null,76,72,74,76,null,null]],
      [40, [59,64,67,71], [83,null,79,76,74,null,71,null]],
      [45, [60,64,67,69], [72,74,76,null,79,null,76,74]],
      [43, [59,62,67,69], [74,null,71,null,72,null,null,null]]
    ]},
    { bpm: 96, bars: [
      [50, [62,66,69,73], [74,78,null,81,78,null,76,null]],
      [45, [61,64,69,71], [73,null,76,81,83,null,81,null]],
      [47, [62,66,69,71], [78,null,76,74,71,null,74,null]],
      [43, [62,66,67,71], [79,78,74,null,76,74,71,null]],
      [50, [62,66,69,73], [74,null,78,81,85,81,78,null]],
      [42, [61,66,69,73], [76,null,73,78,81,null,78,null]],
      [43, [62,66,67,71], [79,null,83,81,79,76,74,null]],
      [45, [61,64,69,71], [73,null,76,null,74,null,null,null]]
    ]},
    { bpm: 85, bars: [
      [53, [60,64,65,69], [77,null,81,84,81,null,79,null]],
      [48, [60,64,67,71], [76,null,79,84,83,null,79,null]],
      [50, [60,62,65,69], [77,79,81,null,84,null,81,77]],
      [46, [58,62,65,69], [74,null,77,81,77,null,74,null]],
      [53, [60,64,65,69], [77,null,81,null,84,81,79,77]],
      [45, [60,64,67,69], [76,79,null,81,84,null,79,null]],
      [46, [58,62,65,69], [77,null,74,77,81,79,77,null]],
      [48, [60,64,67,70], [76,null,79,null,77,null,null,null]]
    ]}
  ];

  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  let context;
  let volume;
  let bufferReady = false;
  let enabled = true;
  let preparing;

  function renderButton() {
    const button = document.getElementById(buttonId);
    if (!button) return;
    const text = labels[document.documentElement.lang] || labels['zh-HK'];
    const playing = Boolean(enabled && bufferReady && context?.state === 'running');
    button.textContent = text[0];
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', text[playing ? 2 : 1]);
    button.title = text[playing ? 2 : 1];
    button.hidden = !AudioEngine;
  }

  function composeLoop() {
    const playlist = pieces.slice();
    for (let i = playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
    const sampleRate = 22050;
    const duration = playlist.reduce((sum, piece) => sum + piece.bars.length * 240 / piece.bpm, 0);
    const buffer = context.createBuffer(1, Math.ceil((duration + .85) * sampleRate), sampleRate);
    const samples = buffer.getChannelData(0);
    const echoOffset = Math.round(sampleRate * .23);
    const tones = new Map();

    function pluck(pitch, start, decay, strength) {
      let tone = tones.get(pitch);
      if (!tone) {
        tone = new Float32Array(Math.ceil(sampleRate * 1.5));
        const step = 2 * Math.PI * 440 * 2 ** ((pitch - 69) / 12) / sampleRate;
        for (let i = 0; i < tone.length; i++) {
          const phase = i * step;
          tone[i] = Math.sin(phase) + .17 * Math.sin(phase * 2) / (1 + i / 1800);
        }
        tones.set(pitch, tone);
      }
      const offset = Math.round(start * sampleRate);
      const length = Math.min(tone.length, Math.ceil(decay * sampleRate));
      const attack = Math.round(.016 * sampleRate);
      const falloff = Math.exp(-6.5 / (length - attack));
      let level = strength * .78;
      for (let i = 0; i < length && offset + i < samples.length; i++) {
        const value = tone[i] * (i < attack ? level * i / attack : level);
        samples[offset + i] += value;
        if (offset + i + echoOffset < samples.length) samples[offset + i + echoOffset] += value * .15;
        if (i >= attack) level *= falloff;
      }
    }

    let position = .12;
    for (const piece of playlist) {
      const beat = 60 / piece.bpm;
      for (const [bass, chord, melody] of piece.bars) {
        pluck(bass, position, beat * 1.9, .063);
        pluck(bass + 7, position + beat * 2, beat * 1.5, .043);
        [0, 1, 2, 1, 0, 1, 3, 2].forEach((degree, index) => {
          pluck(chord[degree], position + index * beat / 2, beat * 1.08, index % 2 ? .032 : .043);
        });
        melody.forEach((pitch, index) => {
          if (pitch !== null) pluck(pitch, position + .025 + index * beat / 2, beat * 1.4, .074);
        });
        position += beat * 4;
      }
    }
    return buffer;
  }

  function play() {
    if (!AudioEngine || !enabled) return;
    try {
      if (!context) {
        context = new AudioEngine();
        context.addEventListener('statechange', renderButton);
        volume = context.createGain();
        volume.connect(context.destination);
      }
      volume.gain.setTargetAtTime(1, context.currentTime, .025);
      if (context.state !== 'running') context.resume().catch(renderButton);
      if (!preparing && !bufferReady) {
        preparing = new Promise(resolve => setTimeout(resolve, 0)).then(composeLoop).then(buffer => {
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.loop = true;
          source.connect(volume);
          source.start();
          bufferReady = true;
          renderButton();
        }).catch(renderButton).finally(() => { preparing = undefined; });
      }
    } catch {
      renderButton();
    }
  }

  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('#' + buttonId)) {
      if (enabled && bufferReady && context?.state === 'running') {
        enabled = false;
        volume.gain.cancelScheduledValues(context.currentTime);
        volume.gain.setTargetAtTime(0, context.currentTime, .015);
      } else {
        enabled = true;
        play();
      }
      try { localStorage.setItem(preferenceKey, enabled ? 'on' : 'off'); } catch {}
      renderButton();
    } else if (event.isTrusted && enabled && context?.state !== 'running') {
      play();
    }
  });

  new MutationObserver(renderButton).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  document.addEventListener('DOMContentLoaded', () => {
    try { enabled = localStorage.getItem(preferenceKey) !== 'off'; } catch {}
    renderButton();
    if (enabled) play();
  });
})();
