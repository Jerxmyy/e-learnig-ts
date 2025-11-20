import { describe, it, expect } from 'vitest'

describe('DOM manipulation', () => {
  it('crée et insère un élément', () => {
    document.body.innerHTML = `<div id="root"></div>`
    const root = document.getElementById('root')!

    const el = document.createElement('span')
    el.textContent = 'hello'
    root.appendChild(el)

    expect(root.textContent).toContain('hello')
  })
})
