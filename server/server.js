import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is running'
  });
});

app.get('/users', async (req, res) => {
  try {
    const { name, email, age } = req.query;

    const where = {};

    if (name) {
      where.name = {
        contains: String(name),
        mode: 'insensitive'
      };
    }

    if (email) {
      where.email = {
        equals: String(email),
        mode: 'insensitive'
      };
    }

    if (age !== undefined) {
      const parsedAge = Number(age);

      if (Number.isInteger(parsedAge)) {
        where.age = parsedAge;
      }
    }

    const users = await prisma.user.findMany({
      where
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: Number(req.body.age)
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: Number(req.body.age)
      }
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({
      message: 'User deleted'
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

const runServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

if (process.env.NODE_ENV !== 'production') {
  runServer();
}

export default app;