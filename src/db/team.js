import mongoose from 'mongoose';

const { Schema } = mongoose;

const teamSchema = Schema({ name: String });
const Team = mongoose.model('Team', teamSchema);

export default Team;
