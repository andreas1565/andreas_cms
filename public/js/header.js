const sidemenu =  document.querySelector('#side-menu');
const openmenu = document.querySelector('.open');
const clouse = document.querySelector('.btn-close');
const main = document.querySelector('#main');
openmenu.addEventListener('click', open);
clouse.addEventListener('click', clous)
function open(){
    const browserwindow = window.matchMedia("(max-width: 500px)");
    if(browserwindow.matches){
        sidemenu.style.width = '250px';
    }else{
        sidemenu.style.width = '450px';
    }
}
function clous(){
    sidemenu.style.width = '0';
}