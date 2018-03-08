import { minMaxPositionsForProperty } from "./calculateEnemyMove";

// TODO: This really isn't a public method.
// These were useful for dev purposes, but I might want to consider deleting these tests?
describe("minMaxPositionsForProperty", () => {
  describe("when everything is unique", () => {
    it("should return the min and max items", () => {
      it("should exclude that column", () => {
        const items = [
          {x: 1, y: 1},
          {x: 2, y: 2},
          {x: 3, y: 2},
          {x: 4, y: 2}
        ]

        expect(minMaxPositionsForProperty(items, 'x')).toEqual([
          {x: 4, y: 2}
        ])
      })
    })
  })

  describe("when a bunch of items are the same minimum", () => {
    it("should exclude the minimum", () => {
      const items = [
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 3, y: 2}
        {x: 4, y: 2}
      ]

      expect(minMaxPositionsForProperty(items, 'x')).toEqual([
        {x: 4, y: 2}
      ])
    })
  })

  describe("when a bunch of items are in the same maximum", () => {
    it("should exclude the maximum", () => {
      const items = [
        {x: 1, y: 1},
        {x: 4, y: 2},
        {x: 4, y: 2},
        {x: 4, y: 2}
      ]

      expect(minMaxPositionsForProperty(items, 'x')).toEqual([
        {x: 1, y: 1}
      ])
    })
  })
})