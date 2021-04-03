const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth');

const UserController = require('./controllers/UserController');
const AdminsController = require('./controllers/AdminsController');
const RecargaController = require ('./controllers/RecargaController');
const VendedorController = require ('./controllers/VendedorController');
const VendaController = require ('./controllers/VendaController');
const PagamentoController = require ('./controllers/PagamentoController');
const AcessoController = require ('./controllers/AcessoController');
const ProdutoController = require ('./controllers/ProdutoController');
const DepartamentoController = require('./controllers/DepartamentoController');
const EspecialController = require('./controllers/EspecialController');

////////////////////////////////////////////////////////////////

const routes = express.Router();
routes.use(cors());
routes.get('/',(req,res)=>{ res.send('Sistema  em funcionamento...'); });
routes.post('/systemlogin', AdminsController.login);
routes.post('/login', VendedorController.login);

////////////////////////////////////////////////////////////////

// routes.use(authMiddleware);

////////////////////////////////////////////////////////////////
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:matricula', UserController.update);
routes.get('/users/r/:matricula', UserController.findRecharge);
routes.get('/users/f/:matricula', UserController.findByMat);
routes.get('/users/:matricula', UserController.credenciais);
routes.delete('/users/:matricula', UserController.delete);
////////////////////////////////////////////////////////////////
routes.post('/admins', AdminsController.store);
routes.put('/admins/:login', AdminsController.update);
routes.delete('/admins/e/:email', AdminsController.deleteByEmail);
routes.delete('/admins/l/:login', AdminsController.deleteByLogin);
routes.get('/admins/f/:login', AdminsController.findByLogin);
routes.get('/admins', AdminsController.index);
////////////////////////////////////////////////////////////////

routes.get('/recargas', RecargaController.index);
routes.post('/recargas/:matricula', RecargaController.store); //**?**?**?**
routes.put('/recargas/:matricula', UserController.update);
////////////////////////////////////////////////////////////////

routes.delete('/vendedores/m/:matricula', VendedorController.deleteByMatricula);
routes.delete('/vendedores/e/:email', VendedorController.deleteByEmail);
routes.get('/vendedores/f/:matricula', VendedorController.findByMat);
routes.get('/vendedores', VendedorController.index);
routes.post('/vendedores', VendedorController.store);
routes.put('/vendedores', VendedorController.update);
////////////////////////////////////////////////////////////////

routes.get('/departamento/', DepartamentoController.index);
routes.get('/departamento/:nome', DepartamentoController.find);
routes.post('/departamento', DepartamentoController.store)
routes.put('/departamento/:nome', DepartamentoController.update);
routes.delete('/departamento/:nome', DepartamentoController.delete);

////////////////////////////////////////////////////////////////

routes.get('/vendas', VendaController.index);
routes.post('/vendas/:matricula/',VendaController.store);//**?**?**?**
////////////////////////////////////////////////////////////////

routes.get('/pagamentos', PagamentoController.index);
routes.post('/pagamentos/:id_venda', PagamentoController.store);//**?**?**?**
////////////////////////////////////////////////////////////////

routes.put('/acessos/:id_acesso/', AcessoController.confirm);
routes.get('/acessos', AcessoController.index);
routes.get('/acessos/requests', AcessoController.notConfirmed);
routes.get('/acessos/allow', AcessoController.Confirmed);
routes.get('/acessos/a/:login/', AcessoController.indexAdmin);
routes.get('/acessos/v/:matricula/', AcessoController.indexVendedor);
routes.post('/acessos/:matricula', AcessoController.store);
routes.get('/acessos/date/:data/', AcessoController.findByDate);

////////////////////////////////////////////////////////////////

routes.put('/produtos/:nome', ProdutoController.update);
routes.post('/produtos/:id_venda/', ProdutoController.addProdutosVenda); //**?**?**?**
routes.delete('/produtos/:nome', ProdutoController.deleteByName);
routes.get('/produtos/f/:nome', ProdutoController.findByName);
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id_venda/', ProdutoController.produtosVenda);
routes.post('/produtos', ProdutoController.store);

////////////////////////////////////////////////////////////////

routes.post('/report/:search',EspecialController.report);

////////////////////////////////////////////////////////////////

module.exports = routes;
