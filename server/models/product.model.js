import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'Name is required' 
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    salt: String,
    category: [{ type: mongoose.Schema.ObjectId, ref: 'Category'}],
}]);

export default mongoose.model('Product', ProductSchema);