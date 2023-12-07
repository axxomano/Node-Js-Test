const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const BlogContent = require('./blogContent'); // Import the BlogContent model

class BlogComments extends Model {
    static associate(models) {
      // Define associations
      BlogComments.belongsTo(models.BlogContent, { foreignKey: 'blogContentId' });
    }
  
    // Other methods or properties specific to BlogComments model
  }

BlogComments.init({
    blogContentId: {
        type: DataTypes.INTEGER, // Adjust the type as per your primary key in BlogContent
        allowNull: false,
        references: {
            model: 'BlogContent', // Check that this matches the name of your BlogContent model
            key: 'id', // Replace with the name of the primary key in BlogContent
        },
  commentedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Guest',
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
},{
  sequelize,
  modelName: 'BlogComments',
});

//BlogComments.belongsTo(BlogContent, { foreignKey: 'blogContentId' }); // Define the association

module.exports = BlogComments;
