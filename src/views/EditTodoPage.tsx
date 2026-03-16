'use client';

import {Box, Text} from '@chakra-ui/react';
import {useEffect, useState, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';

import {Button} from '@/components/ui/Button';
import {Input} from '@/components/ui/Input';
import {Textarea} from '@/components/ui/Input';
import {Header} from '@/components/layout/Header';
import {getTodo, updateTodo} from '@/api/todos';
import {todoSchema} from '@/validation/todoSchema';
import {getValidationErrors} from '@/utils/getValidationErrors';
import {useTranslation} from 'react-i18next';
import {useForm} from '@/hooks/useForm';
import IconBackwards from '@icons/icon-backwards.svg';
import IconCheck from '@icons/icon-check.svg';
import type {Todo} from '@/types';

type EditTodoPageProps = {
  id: string;
};

type FormFields = {
  title: string;
  description: string;
};

export function EditTodoPage({id}: EditTodoPageProps) {
  const router = useRouter();
  const {t} = useTranslation();
  const [todo, setTodo] = useState<Todo | null>(null);
  const {fields, setFields, errors, setErrors, isLoading, setIsLoading, setField} = useForm<FormFields>({title: '', description: ''});

  useEffect(() => {
    getTodo(id)
      .then(data => {
        setTodo(data);
        setFields({title: data.title, description: data.description ?? ''});
      })
      .catch(() => router.replace('/todos'));
  }, [id, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const fieldErrors = await getValidationErrors<Partial<FormFields>>(todoSchema(t), fields);
    if (fieldErrors) {
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await updateTodo(id, fields);
      router.push('/todos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box bg="fill-white" borderRadius="16px" p="6" boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)">
        <Box display="flex" alignItems="center" gap="3" mb="6">
          <Button variant="subtle" onClick={() => router.back()}>
            <IconBackwards width={16} height={16} />
          </Button>
          <Text fontSize="heading.2" fontWeight="heading.1" color="text-primary">
            {todo?.title ?? ''}
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="4">
            <Input
              label={t('editTodo.taskName')}
              required
              name="title"
              value={fields.title}
              error={errors.title}
              onChange={setField('title')}
            />
            <Textarea
              label={t('editTodo.description')}
              name="description"
              value={fields.description}
              onChange={setField('description')}
            />
            <Box
              display="flex"
              flexDirection={{base: 'column', md: 'row'}}
              justifyContent="space-between"
              gap="3"
              mt="2"
            >
              <Button
                variant="subtle"
                width={{base: '100%', md: 'auto'}}
                onClick={() => router.back()}
              >
                {t('editTodo.discard')}
              </Button>
              <Button
                type="submit"
                variant="solid"
                width={{base: '100%', md: 'auto'}}
                disabled={isLoading}
                rightIcon={<IconCheck width={16} height={16} />}
              >
                {t('editTodo.save')}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
