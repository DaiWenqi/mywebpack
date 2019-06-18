import picurl from './images/picture.png';
import './index.scss';

// 插入图片
const oImage = new Image();
oImage.src = picurl;

const oDiv = document.createElement('div');
oDiv.classList.add('iconfont','iconchengyunshangjichushuju')

// 使用css
oImage.classList.add('size');

const eleRoot = document.querySelector('#root');

console.log('123!!!!!!!!!! 0000002222244444');
eleRoot.appendChild(oImage);
eleRoot.appendChild(oDiv);