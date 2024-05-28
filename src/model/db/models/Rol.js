module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Roles';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
        
    };

    let config = {
        tableName: 'user_role',
        timestamps: false
    }

    let Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) =>{
        ////relacion entre usuario y rol
        Rol.hasMany(models.Usuarios, {
            as: "RolesPorUsuario", 
            foreignKey: "user_role_id"
        })
    }
    return Rol;
}