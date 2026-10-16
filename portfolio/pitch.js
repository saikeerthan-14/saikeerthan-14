const scenes = [
  { label: 'HELLO, I’M SAI', title: 'I build behind\nthe interface.', body: 'Software engineering, with a focus on backend systems and developer tools.', detail: 'C++ / Go / Python' },
  { label: '01 / DISTRIBUTED FILESYSTEM', title: 'Local operations.\nRemote storage.', body: 'A C++ prototype connects Linux file operations to a remote server using FUSE and gRPC.', detail: 'Linux tools → FUSE client → gRPC → C++ server\nPrototype · caching and replication are future work' },
  { label: '02 / CPU SCHEDULING', title: 'A policy becomes\na running system.', body: 'A C++ simulator explores how scheduling algorithms change the order in which processes run.', detail: 'FCFS / Shortest remaining time / Round robin / Priority' },
  { label: '03 / DEVELOPER TOOLS', title: 'A workspace across\nrepository boundaries.', body: 'A proposed Go layer for px0 combines repository-specific servers with a shared workspace hub.', detail: 'Design proposal · compilation and testing not yet verified' },
  { label: '04 / OPEN SOURCE', title: 'Reading code.\nProposing fixes.', body: 'Public pull requests to RocksDB and the Azure Developer CLI make my approach open to inspection.', detail: 'RocksDB #15410 / Azure Developer CLI #10516\nSubmitted contributions · current review status on GitHub' },
  { label: '05 / WHAT’S NEXT', title: 'Storage. Infrastructure.\nDeveloper experience.', body: 'I’m interested in teams working on the systems and tools that other engineers depend on.', detail: 'Focus: backend and systems engineering' },
  { label: 'LET’S CONNECT', title: 'Your next systems\nproblem. Let’s talk.', body: 'Sai Keerthan Palavarapu', detail: 'saikeerthanp.su@gmail.com\ngithub.com/saikeerthan-14' }
];
const byId = id => document.getElementById(id);
const chapters = [...document.querySelectorAll('[data-scene]')];
let position = 0, playing = false, previousTime = null, currentScene = -1;
const duration = 42, chapterDuration = 6;
function render() {
  const index = Math.min(scenes.length - 1, Math.floor(position / chapterDuration));
  if (index !== currentScene) {
    currentScene = index;
    const scene = scenes[index];
    byId('slide-label').textContent = scene.label;
    byId('slide-title').replaceChildren(...scene.title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    byId('slide-body').textContent = scene.body;
    byId('slide-detail').textContent = scene.detail;
    byId('scene-count').textContent = `0${index + 1} / 07`;
    chapters.forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    byId('slide').classList.remove('enter');
    void byId('slide').offsetWidth;
    byId('slide').classList.add('enter');
  }
  byId('seek').value = String(position);
  byId('elapsed').textContent = `0:${String(Math.floor(position)).padStart(2, '0')}`;
  byId('play').textContent = playing ? 'Pause Ⅱ' : position >= duration ? 'Replay ▶' : 'Play ▶';
  byId('play').setAttribute('aria-label', playing ? 'Pause presentation' : 'Play presentation');
}
function setPlaying(value) {
  if (value && position >= duration) position = 0;
  playing = value;
  previousTime = null;
  byId('player-status').textContent = `${playing ? 'Playing.' : position >= duration ? 'Finished.' : 'Paused.'} Space to play or pause; arrow keys to change chapters. Text presentation, no audio.`;
  render();
}
function goTo(index) { position = Math.max(0, Math.min(scenes.length - 1, index)) * chapterDuration; previousTime = null; render(); }
byId('play').addEventListener('click', () => setPlaying(!playing));
byId('restart').addEventListener('click', () => { position = 0; setPlaying(false); });
byId('previous').addEventListener('click', () => goTo(currentScene - 1));
byId('next').addEventListener('click', () => goTo(currentScene + 1));
byId('seek').addEventListener('input', event => { position = Number(event.target.value); previousTime = null; if(position >= duration) setPlaying(false); render(); });
chapters.forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.scene))));
document.addEventListener('keydown', event => {
  if (['INPUT', 'BUTTON', 'A', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.code === 'Space') { event.preventDefault(); setPlaying(!playing); }
  if (event.code === 'ArrowRight') { event.preventDefault(); goTo(currentScene + 1); }
  if (event.code === 'ArrowLeft') { event.preventDefault(); goTo(currentScene - 1); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) setPlaying(false); });
function tick(now) {
  if (playing) {
    if (previousTime !== null) position = Math.min(duration, position + (now - previousTime) / 1000);
    previousTime = now;
    if (position >= duration) setPlaying(false);
    render();
  }
  requestAnimationFrame(tick);
}
render(); requestAnimationFrame(tick);
