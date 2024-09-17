import { apiUrl } from '@/auth.config';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  // Verificar que el token exista
  if (!token) {
    return new Response("Token not found!", { status: 400 });
  }

  try {
    // Hacer una solicitud al backend de Express
    const response = await fetch(`${apiUrl}auth/verify-email?token=${token}`);

    console.log(response)

    if (!response.ok) {
      const { message } = await response.json();
      return new Response(message, { status: response.status });
    }

    // Si el correo se verifica correctamente
    redirect("/login?verified=true");

  } catch (error) {
    return new Response("Something went wrong!", { status: 500 });
  }
}
