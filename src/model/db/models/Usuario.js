module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Usuarios';
    let cols = {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        profile_picture: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subscription_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
        last_login: DataTypes.DATE,

        account_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_role_id: DataTypes.INTEGER
        
    };

    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = (models) =>{
        Usuario.hasMany(models.Pedidos, {
            as: "usuariosPorPedido", 
            foreignKey: "usuarios_user_id"
        }),

        //relacion entre usuario y rol
        Usuario.belongsTo(models.Roles, {
            as: "usuarioPorRol",
            foreignKey: "user_role_id"
        })

    }

    return Usuario;
}