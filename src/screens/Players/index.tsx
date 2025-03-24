import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { Button } from '@/components/Button'
import { ButtonIcon } from '@/components/ButtonIcon'
import { Filter } from '@/components/Filter'
import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Input } from '@/components/Input'
import { ListEmpty } from '@/components/ListEmpty'
import { PlayerCard } from '@/components/PlayerCard'

import { PlayerStorageDTO } from '@/storage/player/PlayerStorageDTO'
import { playerAddByGroup } from '@/storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@/storage/player/playerGetByGroupAndTeam'
import { playersGetByGroup } from '@/storage/player/playersGetByGroup'

import { AppError } from '@/utils/AppError'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        return Alert.alert(
          'Nova Pessoa',
          'Informe o nome da pessoa para adicionar.'
        )
      }

      const newPlayer = {
        name: newPlayerName.trim(),
        team,
      }

      await playerAddByGroup(newPlayer, group)
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova Pessoa', error.message)
      }

      Alert.alert('Nova Pessoa', 'Não foi possível adicionar.')
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado.'
      )
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="adicionar a galera e separe os times"
      />

      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  )
}
