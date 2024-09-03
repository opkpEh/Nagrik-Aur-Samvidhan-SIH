import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
        unique: true,
	},
	firstScene: { type: String },
	secondScene: { type: String },
	thirdScene: { type: String },
	fourthScene: { type: String },
});

const Story = mongoose.model('Story', storySchema);
export default Story;
