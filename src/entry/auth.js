import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/protected', (req, res) => {
  const token = jwt.sign({
    foo: 'bar',
    expiresIn: '2 days',
  }, 'foobarbaz');

  res.json({ token });
});

export default router;
