import {EditTodoPage} from '@/pages/EditTodoPage';

type Props = {
  params: Promise<{id: string}>;
};

export default async function Page({params}: Props) {
  const {id} = await params;
  return <EditTodoPage id={id} />;
}
