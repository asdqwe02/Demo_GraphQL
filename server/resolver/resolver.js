const Book = require("../models/Book");
const Author = require("../models/Author");
const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),

    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },

  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
  },

  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
	  deleteBook: async (parent, { id }, { mongoDataMethods }) => {
		const deletedBook = await mongoDataMethods.deleteBook(id);
		if (!deletedBook) {
		  throw new Error(`Book with ID ${id} does not exist.`);
		}
		return {
		  success: true,
		  message: `Book with ID ${id} has been deleted successfully.`,
		};
	  },

    deleteAuthor: async (parent, { id }, { mongoDataMethods }) => {
      const deletedAuthor = await mongoDataMethods.deleteAuthor(id);
      return deletedAuthor;
    },
  },
};

module.exports = resolvers;
