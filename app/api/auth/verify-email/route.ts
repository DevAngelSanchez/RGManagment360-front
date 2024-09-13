import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  // Verificar que el token exista
  if (!token) {
    return new Response("Token not found!", { status: 400 });
  }

  const verifyToken = await db.verificationToken.findFirst({
    where: {
      token
    }
  });

  if (!verifyToken) {
    return new Response("Token not found!", { status: 404 });
  }

  // Verificar que no haya expirado
  if (verifyToken.expires < new Date()) {
    return new Response("Token expired!", { status: 400 });
  }

  const user = await db.user.findUnique({
    where: {
      email: verifyToken.identifier
    }
  });

  // Verificar si ya esta activo
  if (user?.emailVerified) {
    return new Response("Email already verified!", { status: 400 })
  }

  // Marcar como verificado
  await db.user.update({
    where: {
      email: verifyToken.identifier
    },
    data: {
      emailVerified: new Date()
    }
  });

  redirect("/login?verified=true");
}
