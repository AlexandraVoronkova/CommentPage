'use strict';

 var Collection = require('mongodbext').Collection;

 // в exports.create передается db из index.js init
 exports.create = function(db) { // коллекцию будем создавать в init index.js
    // создание коллекции в mongodbext
    exports.collection = new Collection(db, 'comments', {
        changeDataMethods: [// допустимые методы коллекции
            'find',
            'insertOne', // мы можем только вставить один документ
            'updateOne', // изменить один документ
            'deleteOne' // или удалить один документ для данной коллекции
            ]
        });
    // экспортируем коллецию из модуля, для использования ее в index.js
    return exports.collection;
};