'use strict';

const flows = [
    {
        name: 'init',
        title: 'Lorem ipsum dolor sit amet?',
        movie: './assets/videos/vaccin_3.mp4',
        choices: [
            {title: 'Vaccin1', value: 'vaccin1'},
            {title: 'Vaccin2', value: 'vaccin2'},
        ]
    },
    {
        name: 'vaccin1',
        title: 'Nulla laoreet lorem dui?',
        movie: './assets/videos/vaccin_1.mp4',
        choices: [
            {title: 'Vaccin2', value: 'vaccin2'},
            {title: 'Início', value: 'init'},
        ]
    },
    {
        name: 'vaccin2',
        title: 'Phasellus elementum arcu?',
        movie: './assets/videos/vaccin_2.mp4',
        choices: [
            {title: 'Vaccin1', value: 'vaccin1'},
            {title: 'Início', value: 'init'},
        ]
    }
];

const nav = document.querySelector('.navigation');
const navTitle = document.querySelector('.navigation-title');
const navChoices = document.querySelector('.navigation-choices');
const navChoice = document.querySelectorAll('.navigation-choice');
const video = document.getElementsByTagName('video')[0];
const prev = document.querySelector('.arrow-prev');
const next = document.querySelector('.arrow-next');
const teste = document.querySelector('.teste-next');

// Inicia a navegação
window.addEventListener('load', () => {
    showNav('hidden');
    setFlow('init');
    video.play();
});

video.addEventListener('ended', () => {
    showNav('show');
});

next.addEventListener('click', () => {
    endVideo();
});

prev.addEventListener('click', () => {
    prevVideo();
});

function setNavigation(obj){
    navChoices.innerHTML = '';
    for(let i = 0; i < obj.length; i++){
        navChoices.innerHTML += '<li class="navigation-choice" data-flow="' + obj[i].value + '" onclick="setFlow(this.dataset.flow);">' + obj[i].title + '</li>';
    }
}

function setTitle(text){
    navTitle.innerHTML = text;
}

function setVideo(path){
    video.setAttribute('src', path);
}

function setFlow(flow){
    let flowSelected = flow;
    let navItems = flows.find(e => e.name === flowSelected);
    setTitle(navItems.title);
    setNavigation(navItems.choices);
    setVideo(navItems.movie);
    showNav('hidden');
}

function showNav(display){
    if(display === 'show'){
        nav.classList.remove('hidden');
    } else {
        nav.classList.add('hidden');
    }
}

function endVideo(){
    video.currentTime = video.duration;
}

function prevVideo(){
    video.currentTime = 0;
    video.play();
}

function openPopup(param){
    let popup = document.querySelector('[data-popup="'+param+'"]');
    popup.classList.add('opened');
    video.pause();
}

function closePopup(){
    let popup = document.querySelector('.popup.opened');
    popup.classList.remove('opened');
    video.play();
}