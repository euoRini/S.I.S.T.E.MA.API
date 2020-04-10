const express = require('express');
const UserController = require('./controllers/UserController');
const AdminsController = require('./controllers/AdminsController');
const RecargaController = require ('./controllers/RecargaController');
const VendedorController = require ('./controllers/VendedorController');
const VendaController = require ('./controllers/VendaController');
const PagamentoController = require ('./controllers/PagamentoController');
const AcessoController = require ('./controllers/AcessoController');
const ProdutoController = require ('./controllers/ProdutoController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:matricula', UserController.credenciais);
routes.delete('/users/:matricula', UserController.delete);

routes.get('/admins', AdminsController.index);
routes.get('/admins/:login', AdminsController.login);
routes.post('/admins', AdminsController.store);
routes.delete('/admins/:data', AdminsController.delete);

routes.get('/recargas', RecargaController.index);
routes.post('/users/:id_cartao/recarga', RecargaController.store);

routes.get('/vendedores', VendedorController.index);
routes.post('/vendedores', VendedorController.store);
routes.delete('/vendedor/:matricula', VendedorController.delete);
routes.delete('/vendedor/:email', VendedorController.edelete);


routes.get('/vendas', VendaController.index);
routes.post('/vendedores/:id_vendedor/venda',VendaController.store);

routes.get('/pagamentos', PagamentoController.index);
routes.post('/vendas/:id_venda/pagamento', PagamentoController.store);

routes.get('/acessos', AcessoController.index);
routes.post('/admins/:id_admin/:id_vendedor/acesso', AcessoController.store);
routes.get('/admins/:id_admin/acesso', AcessoController.admindex);
routes.get('/vendedor/:id_vendedor/acesso', AcessoController.vendindex);

routes.get('/vendas/:id_venda/produto', ProdutoController.prodvend);
routes.post('/vendas/:id_venda/produto', ProdutoController.store);
routes.post('/produto', ProdutoController.newProd);
routes.get('/produtos', ProdutoController.index);
routes.delete('/produtos/:nome', VendedorController.delete);


module.exports = routes;