const header = document.querySelector('.header')
const nav = document.createElement('nav')
nav.classList.add('nav')
const headerDivImg = document.createElement('div')
const headerImg = document.createElement('img')
headerDivImg.classList.add('header-div-img')
const headerDivLi = document.createElement('div')
headerDivLi.classList.add('header-div-li')
const arrayLi = [
    {name:'Random Cats',url: 'randomCats.html'},
    {name:'Favourites',url:'favourites.html'},{name:'Add Cats',url:'uploadCat.html'}]
headerDivImg.append(headerImg)
nav.append(headerDivImg,headerDivLi)
header.append(nav)

headerImg.src = './images/cat-logo.png'
//valores del nav LI
arrayLi.forEach(item => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    headerDivLi.append(li)
    li.append(a)
    a.innerHTML = item.name
    a.href = `./randomCats.html`

})