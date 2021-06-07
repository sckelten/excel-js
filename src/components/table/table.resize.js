import {$} from '@core/dom';

export function resizeHandler(event, $root) {
  const $resizer = $(event.target)
  const resizerType = $resizer.data.resize
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coordinates = $parent.getCoordinates()
  let value = 0
  let deltaX = 0
  let deltaY = 0

  document.onmousemove = (e) => {
    if (resizerType === 'col') {
      deltaX = Math.floor(e.pageX - coordinates.right)
      value = coordinates.width + deltaX
      $resizer.css({right: -deltaX+'px'})
    } else {
      deltaY = Math.floor(e.pageY - coordinates.bottom)
      value = coordinates.height + deltaY
      $resizer.css({bottom: -deltaY + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (resizerType === 'col') {
      $parent.css({width: value + 'px'})
      $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = value + 'px')
    } else {
      $parent.css({
        'height': value+'px',
      })
    }
    $resizer.css({
      right: '0px',
      bottom: '0px',
    })
  }
}
