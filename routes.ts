import { Router } from 'express'
import { userRoutes } from './src/domains/user/routes/user.routes'
import { authRoutes } from './src/auth/routes/auth.routes'
import { jobRoutes } from './src/domains/job/routes/job.routes'
import { techSearchRoutes } from './src/domains/techSearch/routes/techsearch.routes'

export const routes = Router()

routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/job', jobRoutes)
routes.use('/search', techSearchRoutes)
