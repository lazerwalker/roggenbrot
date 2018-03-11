import * as seedrandom from 'seedrandom'

let prng: seedrandom.prng

export function seedRNG(seed?: string): string {
  const theSeed = seed || getRandomSeed();

  prng = seedrandom(theSeed)
  return theSeed
}

export function getRandomSeed(): string {
  return seedrandom()().toString();
}

export function sample<T>(array: Array<T>): T {

  return array[Math.floor(array.length * prng())]
}