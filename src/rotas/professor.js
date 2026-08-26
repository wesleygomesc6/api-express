import { Router } from 'express'
import * as controlador from '../controlador/professor-controlador.js'

const router = Router()

router.get('/professores', controlador.listar)
router.post('/professores', controlador.criar)
router.put('/professores/:id', controlador.editar)
router.delete('/professores/:id', controlador.deletar)

export const professoresRoutes = router