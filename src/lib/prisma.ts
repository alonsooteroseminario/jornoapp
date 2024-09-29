import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
    // @ts-expect-error any type
  if (!global.prisma) {
    // @ts-expect-error any type
    global.prisma = new PrismaClient()
  }
  // @ts-expect-error any type
  prisma = global.prisma
}

export default prisma