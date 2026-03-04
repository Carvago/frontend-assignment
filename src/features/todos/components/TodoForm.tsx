import {Flex} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '../../../components/ui/Button';
import {TextField} from '../../../components/ui/TextField';
import {TextArea} from '../../../components/ui/TextArea';
import {todoFormSchema, type TodoFormData} from '../../../utils/schemas';

type TodoFormProps = {
  initialTitle?: string;
  initialDescription?: string;
  submitLabel: string;
  discardLabel: string;
  onSubmit: (data: TodoFormData) => void;
  onDiscard: () => void;
  loading?: boolean;
};

export const TodoForm = ({
  initialTitle = '',
  initialDescription = '',
  submitLabel,
  discardLabel,
  onSubmit,
  onDiscard,
  loading,
}: TodoFormProps) => {
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {title: initialTitle, description: initialDescription},
  });

  return (
    <Flex as="form" direction="column" gap={6} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({field}) => (
          <TextField
            label={t('task.field.title')}
            required
            value={field.value}
            onChange={field.onChange}
            error={errors.title?.message && t(errors.title.message)}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({field}) => (
          <TextArea
            label={t('task.field.description')}
            value={field.value ?? ''}
            onChange={field.onChange}
          />
        )}
      />

      <Flex
        justify="space-between"
        align="center"
        pt={4}
        direction={{base: 'column-reverse', md: 'row'}}
        gap={3}
      >
        <Button variant="ghost" type="button" onClick={onDiscard} fullWidth>
          {discardLabel}
        </Button>
        <Button type="submit" icon="check" loading={loading} fullWidth>
          {submitLabel}
        </Button>
      </Flex>
    </Flex>
  );
};
