module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Productos';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        popular: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoria_id: DataTypes.INTEGER
        
    };

    let config = {
        tableName: 'productos',
        timestamps: false
    }

    let Producto  = sequelize.define(alias, cols, config);

    Producto.associate = (models) =>{
        //relacion uno a muchos entre categoria y producto
        Producto.belongsTo(models.Categorias, {
            as: "productosPorCategorias", 
            foreignKey: "categoria_id"
        }),

        //relacion muchos a muchos entre productos y pedidos
        Producto.belongsToMany( models.Pedidos, {
        as: 'pedidos',
        through: 'detalle_pedido',
        timestamps: false,
        foreignKey: 'productos_id',
        otherKey: 'pedido_id'
    }),

        //relacion uno a muchos con la tabla intermedia
        Producto.hasMany(models.DetallePedidos, {
            as: 'productoDetallePedidos',
            foreignKey: 'productos_id'
        })

    }

    return Producto;
}