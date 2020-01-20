const db = require('../data/dbConfig')

function getAllAccounts() {
    return db('accounts')
}

function getAccountById(id) {
    return db('accounts').where({id})
}

function createNewAccount({name, budget}) {
    return db('accounts').insert({name, budget})
}

function replacePostById({ id, name, budget }) {
    return db('accounts').where({ id }).update({ name, budget })
  }
  
  function deletePostById(id) {
    return db('accounts').where({ id }).del()
  }

module.exports = {
    getAllAccounts,
    getAccountById,
    createNewAccount,
    replacePostById,
    deletePostById
  }