import { useState } from 'react'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Input } from '@/components/Input'

import { groupCreate } from '@/storage/group/groupCreate'
import { AppError } from '@/utils/AppError'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNew() {
    try {
      const newGroup = group.trim()

      if (newGroup.length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
      }

      await groupCreate(newGroup)

      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Grupo', error.message)
      }

      Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
          disabled={group.length === 0}
        />
      </Content>
    </Container>
  )
}
