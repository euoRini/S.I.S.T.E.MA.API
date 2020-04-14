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
routes.get('/admins/:login', AdminsController.findBylogin);
routes.get('/admins/:email', AdminsController.findByemail);
routes.post('/admins', AdminsController.store);
routes.delete('/admins/l/:login', AdminsController.delete);
routes.delete('/admins/e/:email', AdminsController.edelete);

routes.get('/recargas', RecargaController.index);
routes.post('/recargas/:id_cartao', RecargaController.store);
routes.put('/recargas/:matricula', UserController.update);

routes.get('/vendedores', VendedorController.index);
routes.post('/vendedores', VendedorController.store);
routes.delete('/vendedores/m/:matricula', VendedorController.delete);
routes.delete('/vendedores/e/:email', VendedorController.edelete);
routes.get('/vendedores/:matricula', VendedorController.findbymat);
routes.get('/vendedores/:email', VendedorController.findbyemail);


routes.get('/vendas', VendaController.index);
routes.post('/vendedores/:id_vendedor/venda',VendaController.store);

routes.get('/pagamentos', PagamentoController.index);
routes.post('/vendas/:id_venda/pagamento', PagamentoController.store);

routes.get('/acessos', AcessoController.index);
routes.post('/admins/:id_admin/:id_vendedor/acesso', AcessoController.store);
routes.get('/admins/:id_admin/acesso', AcessoController.admindex);
routes.get('/vendedores/:id_vendedor/acesso', AcessoController.vendindex);

routes.get('/vendas/:id_venda/produto', ProdutoController.prodvend);
routes.post('/vendas/:id_venda/produto', ProdutoController.store);
routes.post('/produto', ProdutoController.newProd);
routes.get('/produtos', ProdutoController.index);
routes.delete('/produtos/:nome', ProdutoController.delete);
routes.get('/produtos/:nome', ProdutoController.findByName);


module.exports = routes;