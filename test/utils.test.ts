import { describe, it, expect } from 'vitest'
import { sum } from '../src/lib/utils'

describe('sum', () => {
  it('adds numbers', () => {
    expect(sum(2, 3)).toBe(5)
  })
})
