import { prisma } from "../db/connection";
import bcrypt from "bcrypt";

export async function authenticate(
  email: string,
  password: string
): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      deletedAt: null,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      Login: true,
    },
  });

  const hashed = user?.Login?.password || "";

  return await bcrypt.compare(password, hashed);
}
