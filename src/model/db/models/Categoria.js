module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Categorias';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    };

    let config = {
        tableName: 'categoria',
        timestamps: false
    }

    let Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = (models) =>{
        Categoria.hasMany(models.Productos, {
            as: "CategoriasConProductos", 
            foreignKey: "categoria_id"
        })
    }

    return Categoria;
}