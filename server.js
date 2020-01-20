const express = require('express');

const db = require('./data/dbConfig.js');
const server = express();
const { getAllAccounts, getAccountById, createNewAccount, replacePostById, deletePostById } = require('./accounts/account-model')

server.use(express.json());

server.get('/api/accounts', async (req, res) => {
    try {
        const accounts = await getAllAccounts()
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        })
    }
})

server.get('/api/accounts/:id', async (req, res) => {
    const { id } = req.params
    try {
        const account = await getAccountById(id)
        if(account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({
                error: 'Id does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        })
    }
})

server.post("/api/accounts", (req, res) => {
    
    if(req.body.name && req.body.budget) {
        createNewAccount(req.body)
    
          .then(id => {
            res.status(201).json(`Account created with id: ${id}`);
          })
          .catch(error => {
            res.status(500).json({ message: error.message });
          });
    } else {
        res.status(400).json({
            error: 'Invalid user Data'
        })
    }
  });

server.put('/api/accounts/:id', async (req, res) => {
    const { id } = req.params
    const {name, budget} = req.body
    try {
        const idToUpdate = await getAccountById(id)
        if(idToUpdate) {
        replacePostById({id, name, budget})
            .then(account => {
                res.status(202).json({
                    success: 'Successfully updated user',
                    data: {id, name, budget}
                })
            })
            .catch(error => {
                res.status(404).json({
                    error: 'ID doesnt exist or supplied data is in wrong format'
                })
            })
        }
        
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

server.delete('/api/accounts/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const idToDelete = await getAccountById(id)
        console.log(idToDelete);
        if(idToDelete.length > 0) {
            deletePostById(id)
            .then(account => {
                res.status(202).json({
                    success: 'Successfully deleted',
                    account: account
                })    
            })
        } else {
            res.status(404).json({
                error: 'Id not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        })
    }
})

module.exports = server;