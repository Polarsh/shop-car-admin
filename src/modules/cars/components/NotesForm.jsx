import { useState } from 'react'
import CardComponent from '../../../components/Cards/Card'

const NotesForm = ({ notes, setNotes, errors }) => {
  const [text, setText] = useState(notes.join('\n'))

  const handleChange = e => {
    setText(e.target.value)
  }

  const handleBlur = () => {
    const notesArray = text.split('\n').filter(note => note.trim() !== '')
    setNotes(notesArray)
  }

  return (
    <CardComponent>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>Notas</h3>
      <textarea
        className='w-full p-2 border border-gray-300 rounded'
        rows='4'
        placeholder='Escriba sus notas aquí, cada línea será una nota distinta'
        onChange={handleChange}
        onBlur={handleBlur}
        value={text}
      />
      {errors && <p className='text-xs text-red-500'>{errors.message}</p>}
    </CardComponent>
  )
}

export default NotesForm
