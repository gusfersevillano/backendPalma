import {Router} from 'express';
const router=Router();

import {getUsers, getUserbyId, createUser, deleteUser, updataUser} from '../controllers/index.controller';
import {getFincas, getFincasbyId, createFincas, deleteFincas, updataFincas} from '../controllers/index.controller';
import {getTecnicosfincas, getTecnicosfincasbyId, getTecnicosfincasbyUser, getTecnicosfincasbyFinca,createTecnicosfincas, deleteTecnicosfincas, updataTecnicosfincas} from '../controllers/index.controller';
import {getProduccion, getProduccionbyId, getProduccionbyFinca, createProduccion, deleteProduccion, updataProduccion} from '../controllers/index.controller';
import {getCCalidad, getCCalidadbyId, getCalidadbyFinca, createCCalidad, deleteCCalidad, updataCCalidad} from '../controllers/index.controller';
import {getFitosanitario, getFitosanitariobyId, getFitosanitariobyFinca, createFitosanitario, deleteFitosanitario, updataFitosanitario} from '../controllers/index.controller';
import {getFotoC,getFotoCbyId ,createFotoC, deleteFotoC} from '../controllers/index.controller';
import {getFotoF,getFotoFbyId ,createFotoF, deleteFotoF} from '../controllers/index.controller';
import {getParcelabyFinca, getArbolbyParcela, getArbolbyHileraterraza} from '../controllers/index.controller';

import {getPProduccionbyFinca} from '../controllers/index.controller';
import {getCCalidadbyFinca} from '../controllers/index.controller';

import {signup, signin} from '../controllers/auth';

import multer from '../libs/multer';

router.get('/users', getUsers);
router.get('/users/:id', getUserbyId);
router.post('/users', createUser);
router.put('/users/:id', updataUser);
router.delete('/users/:id', deleteUser);

router.get('/fincas', getFincas);
router.get('/fincas/:id', getFincasbyId);
router.post('/fincas', createFincas);
router.put('/fincas/:id', updataFincas);
router.delete('/fincas/:id', deleteFincas);

router.get('/Tecnicosfincas', getTecnicosfincas);
router.get('/TecnicosfincasU/:id', getTecnicosfincasbyUser);
router.get('/TecnicosfincasF/:id', getTecnicosfincasbyFinca);
router.get('/Tecnicosfincas/:id', getTecnicosfincasbyId);
router.post('/Tecnicosfincas', createTecnicosfincas);
router.put('/Tecnicosfincas/:id', updataTecnicosfincas);
router.delete('/Tecnicosfincas/:id', deleteTecnicosfincas);


router.get('/users/:id/produccion', getProduccion);
router.get('/users/:id/produccion/:id', getProduccionbyId);
router.get('/users/:id/produccionF/:finca', getProduccionbyFinca);
router.post('/users/:id/produccion', createProduccion);
router.put('/users/:id/produccion/:id', updataProduccion);
router.delete('/users/:id/produccion/:id', deleteProduccion);

router.get('/users/:id/CCalidad', getCCalidad);
router.get('/users/:id/CCalidad/:id', getCCalidadbyId);
router.get('/users/:id/CCalidadF/:finca', getCalidadbyFinca);
router.post('/users/:id/CCalidad', createCCalidad);
router.put('/users/:id/CCalidad/:id', updataCCalidad);
router.delete('/users/:id/CCalidad/:id', deleteCCalidad);

router.get('/users/:id/Fitosanitario', getFitosanitario);
router.get('/users/:id/Fitosanitario/:id', getFitosanitariobyId);
router.get('/users/:id/FitosanitarioF/:finca', getFitosanitariobyFinca);
router.post('/users/:id/Fitosanitario', createFitosanitario);
router.put('/users/:id/Fitosanitario/:id', updataFitosanitario);
router.delete('/users/:id/Fitosanitario/:id', deleteFitosanitario);	

router.get('/users/:id/FotoC', getFotoC);
router.get('/users/:id/FotoC/:id', getFotoCbyId);
router.post('/users/:id/FotoC', multer.single('image'), createFotoC);
router.delete('/users/:id/FotoC/:id', deleteFotoC);		


router.get('/users/:id/FotoF', getFotoF);
router.get('/users/:id/FotoF/:id', getFotoFbyId);
router.post('/users/:id/FotoF', multer.single('image'), createFotoF);
router.delete('/users/:id/FotoF/:id', deleteFotoF);		

router.post('/signup', signup);
router.post('/signin', signin);


router.get('/parcelaFincas/:finca', getParcelabyFinca);


router.get('/arbolParcela/:finca/:parcela', getArbolbyParcela);


router.get('/arbolHilera/:finca/:parcela/:hileraterraza', getArbolbyHileraterraza);


router.get('/fincamap/:finca', getPProduccionbyFinca);
router.get('/fincamapC/:finca', getCCalidadbyFinca);

 


//router.get('/test', (req, res) => res.send('Prueba Postgres'))
export default router;