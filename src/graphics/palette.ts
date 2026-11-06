export const HSE = {
  blue: '#2B7FE6',
  blueDark: '#014EB6',
  navy: '#0868D8',
  flameRed: '#E53935',
  hotOrange: '#FF3D00',
  emberYellow: '#FFB300',
  white: '#FFFFFF',
  surface: '#F5F8FC',
} as const;

export const HSE_CSS = `:root{--hse-gfx-blue:${HSE.blue};--hse-gfx-blue-dark:${HSE.blueDark};--hse-gfx-navy:${HSE.navy};--hse-gfx-flame:${HSE.flameRed};--hse-gfx-hot:${HSE.hotOrange};--hse-gfx-ember:${HSE.emberYellow};--hse-gfx-white:${HSE.white};--hse-gfx-surface:${HSE.surface};}`;
