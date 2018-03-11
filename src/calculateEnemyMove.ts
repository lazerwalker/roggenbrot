import { getPlayer, BoardState } from "./state";
import Piece, { Position, PieceType } from "./Piece";
import { validMoves } from "./validMoves";
import * as _ from "lodash";
import { sample } from "./random";

type Strategy = (possibleMoves: Position[], player: Piece, board: BoardState) => Position;

export default function calculateEnemyMove(state: BoardState, enemy: Piece): Position|undefined {
  const player = getPlayer(state)
  if (!player) { return }

  const strategyMap = {
    [PieceType.Bishop]: randomMove, // TODO
    [PieceType.King]: farthestFromPlayer,
    [PieceType.Knight]: randomMove,
    [PieceType.Pawn]: nearestToPlayer,
    [PieceType.Queen]: randomMove, // TODO
    [PieceType.Rook]: rookStrategy
  }

  const strategy: Strategy = strategyMap[enemy.piece]
  const possibleMoves = validMoves(enemy, state)

  const win = winningMove(possibleMoves, player)
  if (win) {
    console.log("Returning win", win)
    return win
  }

  return strategy(possibleMoves, enemy, state)
}

function winningMove(possibleMoves: Position[], player: Piece): Position|undefined {
  const result = possibleMoves.filter((m) => m.x === player.x && m.y === player.y)
  return (result.length > 0 ? result[0] : undefined)
}

function randomMove(possibleMoves: Position[], player: Piece): Position {
  return sample(possibleMoves)!
}

function nearestToPlayer(possibleMoves: Position[], player: Piece): Position {
  const sorted = _.sortBy(possibleMoves, (pos) => {
    return Math.abs(pos.x - player.x) + Math.abs(pos.y - player!.y)
  })
  return sorted[0]
}

function farthestFromPlayer(possibleMoves: Position[], player: Piece): Position {
  const sorted = _.sortBy(possibleMoves, (pos) => {
    return Math.abs(pos.x - player.x) + Math.abs(pos.y - player!.y)
  })
  return sorted[sorted.length - 1]
}

function rookStrategy(possibleMoves: Position[], player: Piece): Position {
  let extremeMoves = minMaxPositionsForProperty(possibleMoves, "x")
    .concat(minMaxPositionsForProperty(possibleMoves, "y"))

  extremeMoves = _.uniq(extremeMoves)
  return nearestToPlayer(extremeMoves, player)
}

// TODO: Only exported for test. Is there a way around that?
export function minMaxPositionsForProperty(possibleMoves: Position[], property: string): Position[] {
  let result = []

  const group = _.groupBy(possibleMoves, property)
  const uniqueXValues = Object.keys(group)
    .map((m) => parseInt(m, 10))

  if (uniqueXValues.length > 0) {
    const min = Math.min(...uniqueXValues)
    const max = Math.max(...uniqueXValues)
    result.push(group[min])
    if (min !== max) {
      result.push(group[max])
    }
  }

  result = result.filter((n) => n.length === 1)

  return _.flatten(result)
}
