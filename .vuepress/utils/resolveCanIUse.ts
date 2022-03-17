const source = (feature: string) => {
  return `
  <p class="ciu_embed" data-feature="${feature}" data-periods="future_2,future_1,current,past_1,past_2" data-accessible-colours="false">
  <picture>
  <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/${feature}.webp">
  <source type="image/png" srcset="https://caniuse.bitsofco.de/image/${feature}.png">
  <img src="https://caniuse.bitsofco.de/image/${feature}.jpg" alt="Data on support for the ${feature} feature across the major browsers from caniuse.com">
  </picture>
  </p>
  `
}
export const resolveCanIuseOption = (type = 'caniuse') => {
  const before = '<div class="caniuse-container">\n'
  const after = '\n</div>'
  const render = (tokens, index) => {
    const token = tokens[index]
    if (token.nesting === 1) {
      const feature = token.info.trim().slice(type.length).trim() || ''
      if (feature) {
        return before + source(feature)
      }
      return before
    } else {
      return after;
    }
  }
  return { type, render }
}