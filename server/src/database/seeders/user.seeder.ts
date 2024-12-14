import { users } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { DatabaseConfig } from '../config/database.config';

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

type UserSeed = {
  name: string;
  userName: string;
  password: string;
  roleId: number;
};

const initialUsers: UserSeed[] = [
  {
    name: 'Administrador',
    userName: 'admin',
    password: 'admin123',
    roleId: 1,
  },
  {
    name: 'Usuario Normal',
    userName: 'user',
    password: 'user123',
    roleId: 2,
  },
];

export async function seedUsers(
  db: ReturnType<typeof DatabaseConfig.getDrizzle>,
) {
  try {
    console.log('Starting users seeding...');
    const userHashes = await Promise.all(
      initialUsers.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      })),
    );
    await db.insert(users).values(userHashes);

    console.log('Users seeding completed successfully');
  } catch (error) {
    console.error('Error during users seeding:', error);
    throw error;
  }
}
