import { Router } from 'express'
import * as controlador from '../controlador/aluno-controlador.js'

const router = Router()

router.get('/alunos', controlador.listar)
router.post('/alunos', controlador.criar)
router.put('/alunos/:id', controlador.editar)
router.delete('/alunos/:id', controlador.deletar)

export const alunosRoutes = router