export const pageTransitionConfig = {
  start: {
      x: '-100vw',
      opacity: 0,
      scale: 0.1,
      transition: {
        duration: '0',
      }
  },
  animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: '0',
      }
  },
  end: {
      x: '100vw',
      opacity: 0,
      scale: 0.1,
      transition: {
        duration: '0',
      }
  },
}