const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
      //method to compare entered password to hash
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //ensures it's unique across all rows; ie: only one user can have this email
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8],
                    msg: 'Password must be at least 8 characters in length.'
                },
                hasRequiredCharacters: function (value) {
                    if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)) {
                      throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character');
                    }//ends if
                }//ends hasrequiredcharacters
            }//ends validate
        }//ends password

    },//ends User model object
    {
        hooks: {
            //hashes password before it's created
            beforeCreate: async (newUserData) => {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            //hashes again before updated
            beforeUpdate: async (updatedUserData) => {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            },
          },
        //establishes sequelize functionality with this model and db
        sequelize,
        timestamps: false,
        underscored: true,
    }
);//ends User model parens