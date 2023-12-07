const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const BlogComments = require('./blogComments'); // Import the BlogComments model

class BlogContent extends Model {
    static associate(models) {
      // Define associations
      BlogContent.hasMany(models.BlogComments, { foreignKey: 'blogContentId' });
    }
  
    // Other methods or properties specific to BlogContent model
  }
BlogContent.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'BlogContent',
});

BlogContent.hasMany(BlogComments, { foreignKey: 'blogContentId' }); // Define the association

module.exports = BlogContent;
