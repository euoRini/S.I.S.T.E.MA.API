const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Acesso = require('../models/Acesso');
const Admins = require('../models/Admins');
const Pagamento = require('../models/Pagamento');
const Produto = require('../models/Produto');
const Recarga = require('../models/Recarga');
const Venda = require('../models/Venda');
const Vendedor = require('../models/Vendedor');

const connection = new Sequelize(dbConfig);

User.init(connection);
Acesso.init(connection);
Pagamento.init(connection);
Admins.init(connection);
Produto.init(connection);
Recarga.init(connection);
Venda.init(connection);
Vendedor.init(connection);

Recarga.associate(connection.models);
Venda.associate(connection.models);
Vendedor.associate(connection.models);
Admins.associate(connection.models);
Acesso.associate(connection.models);
Pagamento.associate(connection.models);
Produto.associate(connection.models);

module.exports = connection;