import {TodoDetailPage} from '@/views/TodoDetailPage';

type Props = {
  params: Promise<{id: string}>;
};

export default async function Page({params}: Props) {
  const {id} = await params;
  return <TodoDetailPage id={id} />;
}
