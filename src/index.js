import picurl from './images/picture.png';

const oImage = new Image();
oImage.src = picurl;

const eleRoot = document.querySelector('#root');

eleRoot.appendChild(oImage);