module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Pedidos';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        date_sale: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        usuarios_user_id: DataTypes.INTEGER
        
    };

    let config = {
        tableName: 'pedido',
        timestamps: false
    }

    let Pedido = sequelize.define(alias, cols, config);

    Pedido.associate = (models) =>{
        //relacion muchos a muchos entre productos y pedidos
        Pedido.belongsToMany( models.Productos, {
            as: 'productos',
            through: 'detalle_pedido',
            timestamps: false,
            foreignKey: 'pedido_id',
            otherKey: 'productos_id'
        }),

        //relacion uno a muchos con la tabla intermedia
        Pedido.hasMany(models.DetallePedidos, {
            as: 'pedidosDetallePedidos',
            foreignKey: 'pedido_id'
        }),

        //relacion de uno a muchos entre usuario y pedido
        Pedido.belongsTo(models.Usuarios, {
            as: "pedidoPorUsuario",
            foreignKey: "usuarios_user_id"
        })
    }

    return Pedido;
}