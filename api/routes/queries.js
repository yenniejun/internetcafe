const { pool } = require('./../config')

const getCafes = (request, response) => {
  pool.query('SELECT * FROM cafe ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCafeById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM cafe WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error
    }
    if (result.rowCount === 0) {
    	response.status(404).json(id)
    } else {
    	response.status(200).json(result.rows)
    }
  })
}

const createCafe = (request, response) => {

// TODO handle the case where the key already exists

  console.log("IN CREATE CAFE query")

	// Eventually, cafeID is NOT passed in; it is generated server-side
  const { cafeName, location, capacity, isPrivate } = request.body
  console.log(request.body)
  console.log([cafeName, location, capacity, isPrivate])

  pool.query('INSERT INTO cafe (cafename, location, capacity, isprivate) VALUES ($1, $2, $3, $4) RETURNING id',
   [cafeName, location, capacity, isPrivate], (error, result) => {

    console.log("result", result)
    response.status(201).json({'id': result.rows[0].id})
  })
}


module.exports = {
  getCafes,
  getCafeById,
  createCafe
}
