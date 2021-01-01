import express from 'express'
import { getStates, getDistricts, getAll } from '../handler/stateCityHandler';
const router = express.Router()


router.get('/', getStates);

router.get('/all', getAll);

router.post('/', getDistricts);

export default router