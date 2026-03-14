'use client';

import {Box, Text} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {ValidationError} from 'yup';
import {object, string} from 'yup';

import {Button} from '@/components/Button';
import {Input} from '@/components/Input';
import {Textarea} from '@/components/Input';
import {Header} from '@/components/Header';
import {createTodo} from '@/api/todos';
import IconBackwards from '@icons/icon-backwards.svg';
import IconCheck from '@icons/icon-check.svg';

const newTodoSchema = object({
  title: string().required('Task name is required'),
  description: string().optional(),
});

type FormErrors = {
  title?: string;
};

export function NewTodoPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await newTodoSchema.validate({title, description}, {abortEarly: false});
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: FormErrors = {};
        err.inner.forEach(e => {
          if (e.path) fieldErrors[e.path as keyof FormErrors] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsLoading(true);
    try {
      await createTodo({title, description});
      router.push('/todos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        bg="fill-white"
        borderRadius="16px"
        p="6"
        boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)"
      >
        <Box display="flex" alignItems="center" gap="3" mb="6">
          <Button variant="subtle" onClick={() => router.back()}>
            <IconBackwards width={16} height={16} />
          </Button>
          <Text fontSize="heading.2" fontWeight="heading.1" color="text-primary">
            New task
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="4">
            <Input
              label="Task name"
              required
              name="title"
              value={title}
              error={errors.title}
              onChange={e => setTitle(e.target.value)}
            />
            <Textarea
              label="Description (Optional)"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" mt="2">
              <Button variant="subtle" onClick={() => router.back()}>
                Discard
              </Button>
              <Button
                type="submit"
                variant="solid"
                disabled={isLoading}
                rightIcon={<IconCheck width={16} height={16} />}
              >
                Create task
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
