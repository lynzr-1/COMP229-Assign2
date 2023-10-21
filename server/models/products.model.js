import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Product name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 1
  },
  category: {
    type: String,
    trim: true,
    required: 'Category is required'
  }
});

export default mongoose.model('Product', ProductSchema);

