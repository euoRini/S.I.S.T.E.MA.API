const express = require('express');
const UserController = require('./controllers/UserController');
const AdminsController = require('./controllers/AdminsController');
const RecargaController = require ('./controllers/RecargaController');
const VendedorController = require ('./controllers/VendedorController');
const VendaController = require ('./controllers/VendaController');
const PagamentoController = require ('./controllers/PagamentoController');
const AcessoController = require ('./controllers/AcessoController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/admins', AdminsController.index);
routes.get('/admins/:login', AdminsController.login);
routes.post('/admins', AdminsController.store);

routes.get('/recargas', RecargaController.index);
routes.post('/users/:id_cartao/recarga', RecargaController.store);

routes.get('/vendedores', VendedorController.index);
routes.post('/vendedores', VendedorController.store);

routes.get('/vendas', VendaController.index);
routes.post('/vendedores/:id_vendedor/venda',VendaController.store);

routes.get('/pagamentos', PagamentoController.index);
routes.post('/vendas/:id_venda/pagamento', PagamentoController.store);

routes.get('/acessos', AcessoController.index);
routes.post('/admins/:id_admin/:id_vendedor/acesso', AcessoController.store);

//routes.get('/produtos/:id_produto/venda', RecargaController.index);
//routes.post('/produtos/:id_produto/venda', RecargaController.store);


module.exports = routes;