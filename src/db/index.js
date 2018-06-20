import mongoose from 'mongoose';

import config from '../config';

export default function initDb() {
  return mongoose.connect(config.db.host);
}
