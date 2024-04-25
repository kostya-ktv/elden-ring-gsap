$(function () {
  'use strict'
  const lenis = new Lenis({
    duration: 0.7
  })
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)


  lenis.on('scroll', ScrollTrigger.update)
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  function scrollTrig() {
    gsap.registerPlugin(ScrollTrigger)
    let gsapBl = $('.gsap__bl').width();
    // full screen
    $('.gsap__item').css('width', `calc(${gsapBl}px - 20vw)`)

    let gsapTrack = $('.gsap__track').width();
    let scrollSliderTransform = gsapTrack - gsapBl

    gsap.to('.gsap__track', {
      scrollTrigger: {
        trigger: '.gsap_slider',
        start: "center center",
        end: () => '+=' + gsapTrack,
        pin: true,
        scrub: true,
      },
      x: "-=" + scrollSliderTransform + 'px'
    })
  }
  scrollTrig()

  const debouncedResize = _.debounce(onWindowResize, 500)
  function onWindowResize() {
    location.reload()
  }
  $(window).on('resize', debouncedResize)
})
