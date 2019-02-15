const root = document.getElementById('root');

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
const FIRST_CHAR = 'a';

loadMoreFigures();

function loadMoreFigures() {
  const prefix = getImgSet();
  for (let i = 0; i < CHARS.length; i++) {
    const code = prefix + CHARS[i];
    const img = document.createElement('img');
    img.src = 'http://i.imgur.com/WZ4nhRB.gif)';

    root.appendChild(img);
    getImage(code, img);
  }
}

function getImage(code, ele) {
  fetch(`/img/${code}`)
    .then((res) => res.text())
    .then(url => {
      ele.src = url;
      ele.onclick = () => window.open(url, '_blank');
    });
}

function getImgSet() {
  const rc = (cs) => cs[Math.floor(Math.random() * cs.length)];
  return FIRST_CHAR + rc(CHARS) + rc(CHARS) + rc(CHARS) + rc(CHARS);
}

function checkPageBottom() {
  const currScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (window.innerHeight + currScroll >= document.body.offsetHeight) {
    loadMoreFigures();
  }
}

window.onscroll = checkPageBottom;
