// Require libraries and files
const express = require('express')
const router = express.Router()

const Submission = require('../models/submissions')

// Get all submissions
// router.get('/', async (req, res) => {
//     try {
//       const submissions = await Submission.find()
//       res.json(submissions)
//     } catch (err) {
//       res.status(500).json({ message: err.message })
//     }
//   })

// Get submissions of a specific type
router.get('/:type', (req, res) => {
  try {
        const submission = Submission.find({"section": req.params.type}, (err, doc) => {
          res.json({message: "success", doc}) // success if there are entries  
        }).catch(err => {
          return err
        })
        // res.json(user)
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})



// Create a new submission question
router.post('/create', async (req, res) => {
  const submission = new Submission({
    ...req.body
  })
  try {
    const newSubmission = await submission.save()
    // send back id message
    res.status(201).json("success")
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})

module.exports = router