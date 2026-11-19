(() => {
  'use strict';

  const songs = [
    ['QLxy9dYHrcg', 'The truth that you leave', 'Pianoboy 高至豪', 'au', '1863892846'],
    ['by4SYYWlhEs', '夜に駆ける', 'YOASOBI', 'au', '1490256995'],
    ['q70X4QvSZ9M', '我看見今晚的月色很美，你呢？', '晚安莉莉', 'au', '1887819000'],
    ['0SMfWmEf8Wo', 'Butter-Fly', '和田光司', 'jp', '520633103'],
    ['s3_5FKpAxAQ', 'All For You', '徐仁國＆鄭恩地', 'au', '1570577663']
  ];
  const copy = {
    'zh-HK': ['播放', '暫停', '瀏覽器阻止咗自動播放，撳「播放」開始。', '呢首歌暫時未能喺頁面播放，可以揀另一首或去 YouTube。', '播放器暫時載入唔到，可以去 YouTube 播放。'],
    'zh-CN': ['播放', '暂停', '浏览器阻止了自动播放，请按「播放」。', '这首歌暂时无法在此播放，请选另一首或前往 YouTube。', '播放器暂时无法加载，请前往 YouTube。'],
    en: ['Play', 'Pause', 'Autoplay was blocked. Press Play to start.', 'This track is unavailable here. Choose another or open YouTube.', 'The player could not load. You can open YouTube.'],
    ja: ['再生', '一時停止', '自動再生がブロックされました。「再生」を押してください。', 'この曲はここでは再生できません。別の曲または YouTube をお試しください。', 'プレーヤーを読み込めません。YouTube で再生してください。'],
    ko: ['재생', '일시정지', '자동재생이 차단되었습니다. 재생을 눌러 주세요.', '이 곡을 여기에서 재생할 수 없습니다. 다른 곡이나 YouTube를 이용하세요.', '플레이어를 불러오지 못했습니다. YouTube에서 재생할 수 있습니다.']
  };
  const panel = document.getElementById('farm-music-panel');
  const screen = document.getElementById('farm-music-screen');
  const trackSelect = document.getElementById('farm-track');
  const toggle = document.getElementById('farm-music-toggle');
  const next = document.getElementById('farm-music-next');
  const status = document.getElementById('farm-music-status');
  const source = document.getElementById('farm-music-source');
  const apple = document.getElementById('farm-music-apple');
  const autoplay = document.getElementById('farm-music-autoplay');
  const autoplayKey = 'blueberryFarmMusicAutoplay';
  let queue = [];
  let current = takeNext();
  let player;
  let ready = false;
  let playing = false;
  let visible = false;
  let wantsPlayback = true;
  let pauseForVisibility = false;
  let statusIndex;
  let loadingTimeout;
  let started = false;

  function takeNext(previous) {
    if (!queue.length) {
      queue = songs.map(([id]) => id);
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
      if (queue[0] === previous) queue.push(queue.shift());
    }
    return queue.shift();
  }

  function render() {
    const words = copy[document.documentElement.lang] || copy['zh-HK'];
    toggle.textContent = words[playing ? 1 : 0];
    toggle.disabled = next.disabled = !ready;
    status.textContent = statusIndex === undefined ? '' : words[statusIndex];
    trackSelect.value = current;
    source.href = 'https://www.youtube.com/watch?v=' + current;
    const [, , , region, appleTrack] = songs.find(([id]) => id === current);
    apple.href = 'https://music.apple.com/' + region + '/song/' + appleTrack;
    apple.textContent = region === 'jp' ? 'Apple Music (JP)' : 'Apple Music';
    apple.hidden = false;
  }

  function canPlayHere() {
    return !panel.hidden && visible && !document.hidden;
  }

  function syncVisibility() {
    if (!ready) return;
    if (!canPlayHere()) {
      if (playing || player.getPlayerState() === YT.PlayerState.BUFFERING) {
        pauseForVisibility = true;
        player.pauseVideo();
      }
      return;
    }
    if (wantsPlayback && !playing && statusIndex === undefined) player.playVideo();
  }

  function selectTrack(id) {
    current = id;
    queue = queue.filter(item => item !== id);
    wantsPlayback = true;
    playing = false;
    statusIndex = undefined;
    render();
    if (!ready) return;
    if (canPlayHere()) player.loadVideoById(id);
    else player.cueVideoById(id);
  }

  function handlePlayerState({ data }) {
    if (data === YT.PlayerState.PLAYING) {
      playing = true;
      pauseForVisibility = false;
      statusIndex = undefined;
      syncVisibility();
    } else if (data === YT.PlayerState.PAUSED) {
      if (!pauseForVisibility && playing) wantsPlayback = false;
      playing = false;
      pauseForVisibility = false;
      if (canPlayHere() && wantsPlayback) syncVisibility();
    } else if (data === YT.PlayerState.ENDED) {
      selectTrack(takeNext(current));
    }
    render();
  }

  function setupPlayer() {
    if (player || !window.YT?.Player) return;
    const initialId = current;
    const frame = document.createElement('iframe');
    const url = new URL('https://www.youtube-nocookie.com/embed/' + current);
    url.search = new URLSearchParams({ enablejsapi: '1', playsinline: '1', origin: location.origin, rel: '0' });
    frame.src = url;
    frame.title = 'YouTube';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    screen.append(frame);
    player = new YT.Player(frame, { events: {
      onReady() {
        clearTimeout(loadingTimeout);
        ready = true;
        statusIndex = undefined;
        if (initialId !== current) player.cueVideoById(current);
        render();
        syncVisibility();
      },
      onStateChange: handlePlayerState,
      onAutoplayBlocked() {
        playing = false;
        statusIndex = 2;
        render();
      },
      onError() {
        playing = false;
        statusIndex = 3;
        render();
      }
    }});
  }

  for (const [id, title, artist] of songs) trackSelect.add(new Option(title + ' · ' + artist, id));
  trackSelect.addEventListener('change', () => selectTrack(trackSelect.value));
  toggle.addEventListener('click', () => {
    if (!ready) return;
    if (playing) {
      wantsPlayback = false;
      player.pauseVideo();
    } else {
      wantsPlayback = true;
      statusIndex = undefined;
      syncVisibility();
    }
    render();
  });
  next.addEventListener('click', () => selectTrack(takeNext(current)));
  document.addEventListener('visibilitychange', syncVisibility);
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  new IntersectionObserver(([entry]) => {
    visible = entry.intersectionRatio > .5;
    syncVisibility();
  }, { threshold: .51 }).observe(screen);
  render();

  function startPlayer() {
    if (started) return;
    started = true;
    window.onYouTubeIframeAPIReady = setupPlayer;
    loadingTimeout = setTimeout(() => {
      if (ready) return;
      statusIndex = 4;
      render();
    }, 12000);
    if (window.YT?.Player) setupPlayer();
    else {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.append(script);
    }
  }

  function setPanel(open) {
    panel.hidden = !open;
    const opener = document.getElementById('farm-playlist-open');
    opener.setAttribute('aria-expanded', String(open));
    if (open) {
      wantsPlayback = true;
      if (statusIndex === 2) statusIndex = undefined;
      const box = screen.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(innerHeight, box.bottom) - Math.max(0, box.top));
      visible = box.height > 0 && visibleHeight / box.height > .5;
      startPlayer();
    } else {
      visible = false;
      if (panel.contains(document.activeElement)) opener.focus();
    }
    syncVisibility();
    render();
  }

  document.addEventListener('click', event => {
    if (event.target.closest('#farm-playlist-open')) setPanel(panel.hidden);
  });
  document.getElementById('farm-playlist-close').addEventListener('click', () => setPanel(false));
  autoplay.addEventListener('change', () => {
    try {
      if (autoplay.checked) localStorage.setItem(autoplayKey, '1');
      else localStorage.removeItem(autoplayKey);
    } catch {
      autoplay.checked = false;
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    try { autoplay.checked = localStorage.getItem(autoplayKey) === '1'; } catch {}
    if (autoplay.checked) setPanel(true);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden && panel.contains(document.activeElement)) setPanel(false);
  });
})();
