const body = document.querySelector("body");


//swiper slider
new Swiper('.swiper-container', {
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//Burger menu 
document.querySelector(".navigation__burger").onclick = function () {
  scrollOff();
  document.querySelector(".navigation__burger").classList.toggle("active");
  document.querySelector(".navigation-menu").classList.toggle("active");
  document.querySelector("body").classList.toggle("lock-scroll");
}

//modal windows
document.addEventListener("click", (event) => {
  if (event.target.closest('.buttons')) {
    const target = event.target.closest('.buttons');
    const pLink = target.getAttribute('href').replace('#', '');
    const modal = document.getElementById(pLink);
    event.preventDefault();
    modalOpen(modal)
  } if (event.target.closest('.close-popup')) {
    modal = event.target.closest('.open');
    event.preventDefault();
    modalClose(modal);
  }
})

function modalOpen(o) {
  scrollOff();
  o.classList.add("open");
  o.addEventListener("click", function (e) {
    if (!e.target.closest('.modal__body')) {
      modalClose(e.target.closest('.modal__overlay'))
    }
  })
}

function modalClose(c) {
  scrollOff();
  c.classList.toggle('open');
}

function scrollOff() {
  let scrollWidth = window.innerWidth - body.clientWidth + "px";
  body.style.paddingRight = scrollWidth;
  body.classList.toggle("scrollOff");
}

//counters
document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener('scroll', () => {
    const countersBlock = document.querySelector('.counters');
    const countersBlockHeight = countersBlock.offsetHeight;
    const countersBlockTopCoord = countersBlock.getBoundingClientRect().top;
    const countersBlockOffset = countersBlockTopCoord + window.pageYOffset;
    const scrolTo = window.pageYOffset
    const counterStart = window.innerHeight - countersBlockHeight / 4;

    if ((scrolTo > countersBlockOffset - counterStart)) {

      const speed = 150;
      const counters = document.querySelectorAll('.counter__number');

      counters.forEach(counter => {
        const updateCount = () => {
          let target = +counter.getAttribute('counter');
          const count = +counter.innerHTML;
          const inc = Math.round(target / speed);
          if (count < target) {
            counter.innerHTML = count + inc;
            setTimeout(updateCount, 10)
          } else {
            target = Number(target).toLocaleString('en');
            counter.innerHTML = target;
          }
        }
        updateCount();
      });
    }
  })
});

//dynamic output from array

const cuisineArray = [
  { cuisineTitle: 'Italian', cuisineRecipesNumbr: '327 Recipes', cuisineImage: 'img/italian.jpg' },
  { cuisineTitle: 'Indian', cuisineRecipesNumbr: '856 Recipes', cuisineImage: 'img/indian.jpg' },
  { cuisineTitle: 'French', cuisineRecipesNumbr: '27 Recipes', cuisineImage: 'img/french.jpg' },
  { cuisineTitle: 'Steakhouse', cuisineRecipesNumbr: '174 Recipes', cuisineImage: 'img/steakhouse.jpg' },
  { cuisineTitle: 'Seafood', cuisineRecipesNumbr: '731 Recipes', cuisineImage: 'img/seafood.jpg' },
  { cuisineTitle: 'Sushi', cuisineRecipesNumbr: '237 Recipes', cuisineImage: 'img/sushi.jpg' },
  { cuisineTitle: 'Mexican', cuisineRecipesNumbr: '529 Recipes', cuisineImage: 'img/mexican.jpg' },
  { cuisineTitle: 'Chinese', cuisineRecipesNumbr: '143 Recipes', cuisineImage: 'img/chinese.jpg' },
  { cuisineTitle: 'Pizza', cuisineRecipesNumbr: '327 Recipes', cuisineImage: 'img/pizza.jpg' },
  { cuisineTitle: 'American', cuisineRecipesNumbr: '1437 Recipes', cuisineImage: 'img/american.jpg' },
]

const addTemplate = (cuisine) =>
  `<div class="cuisine">
<a class="cuisine__link" href="#">
  <div class="cuisine__text">
    <span class="cuisine__recipes">${cuisine.cuisineRecipesNumbr}</span>
    <p class="cuisine__title">${cuisine.cuisineTitle}</p>
  </div>
  <img class="cuisine__image" src="${cuisine.cuisineImage}" alt="${cuisine.cuisineTitle}" >
</a>
</div>
`
function createHtmlBlock(arr) {
  const htmlBlock = arr.map(addTemplate).join('');
  document.querySelector('.cuisines__container').innerHTML = htmlBlock;
}
createHtmlBlock(cuisineArray);


let sortArrAsc = cuisineArray.sort(function (a, b) {
  let nameA = parseInt(a.cuisineRecipesNumbr)
  let nameB = parseInt(b.cuisineRecipesNumbr)
  return nameA - nameB

})

const buttonSort = document.querySelector('.cuisines__sort-btn')
buttonSort.addEventListener('click', function () {
  let sortArrDesc = sortArrAsc.reverse();
  createHtmlBlock(sortArrDesc);
});


