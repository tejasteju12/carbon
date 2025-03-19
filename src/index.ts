import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prismaClient } from "./prism";

const app = new Hono()
const prisma = prismaClient

app.get('/students', async (c) => {
  const students = await prisma.student.findMany();
  return c.json(students, 200);
});

app.get('/students/enriched', async (c) => {
  const students = await prisma.student.findMany({
    include: { proctor: true },
  });
  return c.json(students, 200);
});

app.get('/professors', async (c) => {
  const professors = await prisma.professor.findMany();
  return c.json(professors, 200);
});

app.post('/students', async (c) => {
  const data = await c.req.json();
  const student = await prisma.student.create({
    data,
  });
  return c.json(student, 201);
});

app.post('/professors', async (c) => {
  const data = await c.req.json();
  const professor = await prisma.professor.create({
    data,
  });
  return c.json(professor, 201);
});

app.get('/professors/:professorId/proctorships', async (c) => {
  const { professorId } = c.req.param();
  const students = await prisma.student.findMany({ where: { proctorId: professorId } });
  return c.json(students, 200);
});

app.patch('/students/:studentId', async (c) => {
  const { studentId } = c.req.param();
  const data = await c.req.json();
  const student = await prisma.student.update({ where: { id: studentId }, data });
  return c.json(student, 200);
});

app.patch('/professors/:professorId', async (c) => {
  const { professorId } = c.req.param();
  const data = await c.req.json();
  const professor = await prisma.professor.update({ where: { id: professorId }, data });
  return c.json(professor, 200);
});

app.delete('/students/:studentId', async (c) => {
  const { studentId } = c.req.param();
  await prisma.student.delete({ where: { id: studentId } });
  return c.json({ message: 'Student deleted' }, 200);
});

app.delete('/professors/:professorId', async (c) => {
  const { professorId } = c.req.param();
  await prisma.professor.delete({ where: { id: professorId } });
  return c.json({ message: 'Professor deleted' }, 200);
});

app.post('/professors/:professorId/proctorships', async (c) => {
  const { professorId } = c.req.param();
  const { studentId } = await c.req.json();
  const student = await prisma.student.update({ where: { id: studentId }, data: { proctorId: professorId } });
  return c.json(student, 200);
});

app.get('/students/:studentId/library-membership', async (c) => {
  const { studentId } = c.req.param();
  const membership = await prisma.libraryMembership.findUnique({ where: { studentId } });
  return c.json(membership, 200);
});

app.post('/students/:studentId/library-membership', async (c) => {
  const { studentId } = c.req.param();
  const data = await c.req.json();
  const membership = await prisma.libraryMembership.create({
    data: { ...data, studentId },
  });
  return c.json(membership, 201);
});

app.patch('/students/:studentId/library-membership', async (c) => {
  const { studentId } = c.req.param();
  const data = await c.req.json();
  const membership = await prisma.libraryMembership.update({ where: { studentId }, data });
  return c.json(membership, 200);
});

app.delete('/students/:studentId/library-membership', async (c) => {
  const { studentId } = c.req.param();
  await prisma.libraryMembership.delete({ where: { studentId } });
  return c.json({ message: 'Library membership deleted' }, 200);
});

serve(app);
console.log('Server running on http://localhost:3000');
