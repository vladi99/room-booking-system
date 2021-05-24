import {
  EditIcon as ChakraEditIcon,
  DeleteIcon as ChakraDeleteIcon,
  AddIcon as ChakraAddIcon,
  Icon as ChakraIcon,
} from '@chakra-ui/icons';

export function EditIcon() {
  return <ChakraEditIcon />
}

export function DeleteIcon() {
  return <ChakraDeleteIcon />
}

export function AddIcon() {
  return <ChakraAddIcon />
}

export function Icon(props) {
  return <ChakraIcon {...props} />
}
