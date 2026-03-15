'use client';

import {Box, Text} from '@chakra-ui/react';
import {useState, type ChangeEvent, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';

import {Button} from '@/components/ui/Button';
import {Input} from '@/components/ui/Input';
import {Textarea} from '@/components/ui/Input';
import {Header} from '@/components/layout/Header';
import {createTodo} from '@/api/todos';
import {todoSchema} from '@/validation/todoSchema';
import {getValidationErrors} from '@/utils/getValidationErrors';
import {useTranslation} from 'react-i18next';
import IconBackwards from '@icons/icon-backwards.svg';
import IconCheck from '@icons/icon-check.svg';

type FormFields = {
  title: string;
  description: string;
};

const initialFields: FormFields = {title: '', description: ''};

export function NewTodoPage() {
  const router = useRouter();
  const {t} = useTranslation();

  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [isLoading, setIsLoading] = useState(false);

  const setField = (key: keyof FormFields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({...prev, [key]: e.target.value}));
  };

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
      await createTodo(fields);
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
            {t('newTodo.title')}
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="4">
            <Input
              label={t('newTodo.taskName')}
              required
              name="title"
              value={fields.title}
              error={errors.title}
              onChange={setField('title')}
            />
            <Textarea
              label={t('newTodo.description')}
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
                {t('newTodo.discard')}
              </Button>
              <Button
                type="submit"
                variant="solid"
                width={{base: '100%', md: 'auto'}}
                disabled={isLoading}
                rightIcon={<IconCheck width={16} height={16} />}
              >
                {t('newTodo.create')}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
