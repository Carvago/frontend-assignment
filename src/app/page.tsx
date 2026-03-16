import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';

export default async function HomePage() {
  const token = (await cookies()).get('token')?.value;
  redirect(token ? '/todos' : '/login');
}
