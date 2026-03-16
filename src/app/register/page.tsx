import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {RegisterPage} from '@/views/RegisterPage';

export default async function Register() {
  const token = (await cookies()).get('token')?.value;
  if (token) redirect('/todos');
  return <RegisterPage />;
}
