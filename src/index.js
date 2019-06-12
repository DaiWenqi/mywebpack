import picurl from './images/picture.png';
import './index.scss';

// 插入图片
const oImage = new Image();
oImage.src = picurl;

// 使用css
oImage.classList.add('size');

const eleRoot = document.querySelector('#root');

eleRoot.appendChild(oImage);