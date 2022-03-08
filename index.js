require('dotenv').config()
const express = require('express')
const app = express()

let notes = [
  {id: 1, content: 'first note'}
]

app.use(express.static('build'));

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})