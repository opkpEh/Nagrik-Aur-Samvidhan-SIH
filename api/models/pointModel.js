import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    point: {
        type: Number,
        default: 0
    },
    updated: Date
});

const Point = mongoose.model('Point', pointSchema);

export default Point;