import { AppError } from '@/utils/AppError'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@/storage/storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetByGroup } from './playersGetByGroup'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  const storedPlayers = await playersGetByGroup(group)

  const playerAlreadyExists = storedPlayers.filter(
    (player) => player.name === newPlayer.name
  )

  if (playerAlreadyExists.length > 0) {
    throw new AppError('Essa pessoa já foi adicionada.')
  }

  const storage = JSON.stringify([...storedPlayers, newPlayer])

  await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
}
