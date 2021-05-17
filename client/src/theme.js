import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        color: 'gray.600'
      },
    },
  },
})
