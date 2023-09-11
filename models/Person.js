const mongoose = require('mongoose'); //chamando o mongoose

const Person = mongoose.model('Person', {
    name:String,
    salary:Number,
    approved:Boolean,
})

/** Model é um metodo do mongoose que vai criar a collection no banco de dados com o nome descrito
 * neste caso é 'Person'
*/

module.exports = Person //exportar