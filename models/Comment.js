const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        blog_id: {
            type: DataTypes.Integer,
            references: {
                model: User,
                key: 'id'
            },
        }

    },
    {
        sequelize: sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'comment'
    }
)

module.exports = Comment;