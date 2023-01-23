// swipper
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js"; 
// import link from "https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.8.4/swiper-bundle.min.js";
export default  function Sliderr() {
  
  var swiper = new Swiper(".swiper-initialize", {
    slidesPerView: 5,
    spaceBetween: 20,
    //  //  loop  true  ishlamadi 
    // loop: true,       
    autoplay: true,
    breakpoints: {
      1920: {
        slidesPerView: 5, 
      },
      992: {
        slidesPerView: 3, 
      },
      320: {
        slidesPerView: 2, 
      },
    },
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-paganation",
    },
  });
}




