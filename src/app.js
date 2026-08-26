import express from 'express'
import { alunosRoutes } from './rotas/alunos.js'
import { professoresRoutes } from './rotas/professor.js'

const app = express()

app.use(express.json())
app.use(alunosRoutes)
app.use(professoresRoutes)

export default app
