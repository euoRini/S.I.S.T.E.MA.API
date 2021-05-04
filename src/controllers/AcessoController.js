const Admins = require('../models/Admins');
const Vendedor = require('../models/Vendedor');
const Acesso = require('../models/Acesso');

module.exports = {

  async confirm(req,res)
  {
    const { id_acesso } = req.params; 
    const { login } = req.body;
    if (!login){
      const admin = await Admins.findOne({where:{login:login}});
      if ( !admin ) return res.status( 400 ).send( 'Administrador não encontrado.' );
      var nome_admin = admin.nome
      var id_admin = admin.id;
    }else{
      var nome_admin = "";
      var id_admin = "";
    }
    
    const acesso = await Acesso.findByPk( id_acesso );
    if ( !acesso ) return res.status( 400 ).send( 'Acesso não encontrado.' );
    const confirm = await Acesso.update({ id_admin : id_admin, nome_admin:nome_admin }, { where: { id:id_acesso }});
    return res.status(200).json( confirm );
  },
  
  async index(req,res)
  {
    const acessos = await Acesso.findAll();
    return res.json( acessos );
  },

  async indexAdmin(req,res)
  {
    const { login } = req.params;
    const findAdm = await Admins.findOne({where:{login:login}});
    const id_admin = findAdm.id;
    const admin = await  Admins.findByPk( id_admin, { include: { association: 'ADMacessos'}});
    if ( !admin ) return res.status( 400 ).json( 'Administrador não encontrado.' );
    return res.json( admin );
  },

  async indexVendedor(req,res)
  {
    const { matricula } = req.params;
    const vendedores = await Vendedor.findOne( { where: { matricula:matricula }});
    if ( !vendedores ) return res.status( 400 ).json( 'Vendedor não encontrado.' );
    const vendedor = await Vendedor.findByPk( vendedores.id,{ include: { association: 'VENDacessos' }});
    return res.json( vendedor );
  },

  async store(req, res){
    const {matricula} = req.params;
    const { login } = req.body;
    const findAdm = await Admins.findOne({where:{login:login}});
    if(!findAdm){
       var id_admin = null;
       var nome_admin = null;
    }else{
      var id_admin = findAdm.id;
      var nome_admin = findAdm.nome;
    }
    const findVend = await Vendedor.findOne({where:{matricula:matricula}});
    if ( !findVend ) return res.status( 400 ).json( 'Vendedor não encontrado.' );
    const id_vendedor = findVend.id;
    const nome_vendedor = findVend.nome;
    const acesso = await Acesso.create({ id_vendedor, id_admin, nome_vendedor, nome_admin });
    return res.json( acesso );
  },


  async Confirmed(req,res){
    const acessos = await Acesso.findAll();    
    const validos = new Array();
    for(var i=0, len = acessos.length; i<len;i++){
      const admins = acessos[i].id_admin;
      if(admins) validos.push(acessos[i])
    }
    return res.json( validos );
  },

  async notConfirmed(req,res){
    const acessos = await Acesso.findAll();    
    const validos = new Array();
    for(var i=0, len = acessos.length; i<len;i++){
      const admins = acessos[i].id_admin;
      if(!admins) validos.push(acessos[i])
    }
    return res.json( validos );
  },

  async findByDate(req,res){
    const { data } = req.params;
    const Meses = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    const DMA = data.split('-');
    if(!DMA.length === 10) return res.status(401).json('Data inválida');
    const [Dia, Mes, Ano] = DMA;
    MDA = Meses[Mes-1];
    const dataE = MDA +'/'+Dia+'/'+Ano;
    const acessos = await Acesso.findAll();
    const validos = new Array();
    for(var i = 0, len = acessos.length; i<len; i++){
      const data = acessos[i].createdAt.toString();
      const parts = data.split(' ');
      if(!parts.length === 10) return res.status(401).json('Data inválida');
      const [ D, M, DN, A, H, Hrr, b, c, e, f] = parts;
      const dataC = M.concat('/',DN,'/',A);
      if( dataC === dataE ) validos.push(acessos[i]);
    }
    return res.status(200).json(validos);
  },

};
