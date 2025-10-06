// 1. Find all books in a specific genre

db.books.find({ genre: "Fantasy" })

// 2. Find books published after a certain year

db.books.find({ published_year: { $gt: 1940 }})

// 3. Find books by a specific author

db.books.find({ author: "Jane Austen" })

// 4. Update the price of a specific book

db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 15.50 } }
)

// 5. Delete a book by its title

db.books.deleteOne({ title: "To Kill a Mockingbird" })

// Advanced Queries
// 1 - Write a query to find books that are both in stock and published after 2010

db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 2 - Use projection to return only the title, author, and price fields in your queries

db.books.find(
    {in_stock: true},
    { title: 1, author: 1, price: 1 }
)
// 3 - Implement sorting to display books by price (both ascending and descending)

db.books.find().sort( { price: 1 }) // Ascending
db.books.find().sort( { price: -1 }) // Descending

// 4 - Use the `limit` and `skip` methods to implement pagination (5 books per page)

db.books.find().skip(0).limit(5)
db.books.find().skip(5).limit(5)
db.books.find().skip(10).limit(5)
db.books.find().skip(15).limit(5)
db.books.find().skip(20).limit(5)


// Aggregation Pipeline
// 1 - Create an aggregation pipeline to calculate the average price of books by genre

db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price"} } }
])

// 2 - Create an aggregation pipeline to find the author with the most books in the collection

db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// 3 - Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: { 
        decade: { $multiply: [ { $trunc: { $divide: ["$published_year", 10] } }, 10 ] }
      },
      bookCount: { $sum: 1 }
    }
  },
])

//  Indexing
// 1 - Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 })
    
// 2 - Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: 1 })

// 3 - Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")