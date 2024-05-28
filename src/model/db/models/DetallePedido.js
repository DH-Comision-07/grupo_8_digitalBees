module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'DetallePedidos';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        pedido_id: DataTypes.INTEGER,
        productos_id: DataTypes.INTEGER
        
    };

    let config = {
        tableName: 'detalle_pedido',
        timestamps: false
    }

    let DetallePedido = sequelize.define(alias, cols, config);

    // Relación uno a muchos con la tabla intermedia
    DetallePedido.associate = (models) => {
        DetallePedido.belongsTo(models.Productos, {
            as: 'productoDetallePedidos',
            foreignKey: 'productos_id'
        });
        DetallePedido.belongsTo(models.Pedidos, {
            as: 'pedidosDetallePedidos',
            foreignKey: 'pedido_id'
        }); 
    };

    return DetallePedido;
}