import mongoose from 'mongoose';

const scoreboardSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		score: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

export default Scoreboard;
