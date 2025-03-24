import { playersGetByGroup } from './playersGetByGroup'

export async function playersGetByGroupAndTeam(group: string, team: string) {
  const storage = await playersGetByGroup(group)

  const players = storage.filter((player) => player.team === team)

  return players
}
