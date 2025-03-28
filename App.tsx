import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { ThemeProvider } from 'styled-components/native'

import { Loading } from '@/components/Loading'
import { Routes } from '@/routes'
import theme from '@/theme'
import { StatusBar } from 'react-native'

export default function App() {
  const [isFontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {isFontLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  )
}
