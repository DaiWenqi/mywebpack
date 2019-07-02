import './style.scss';
import './style2.scss';
document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */ './click.js').then(({default:func}) => {
        func();
    });
});
