import {
  fetchTaskList,
  fetchTask,
  createTask,
  updateTask,
  deleteTask,
  setTaskCompleted,
} from './tasks';
import {apiClient} from './client';

jest.mock('./client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

const todoDto = (
  overrides: Partial<{
    id: string;
    title: string;
    description: string;
    createdAt: string;
    completed: boolean;
    userId: string;
  }> = {}
) => ({
  id: 'tid-1',
  title: 'Task one',
  description: 'Desc',
  createdAt: '2023-01-01T00:00:00Z',
  completed: false,
  userId: 'u1',
  ...overrides,
});

describe('fetchTaskList', () => {
  it('maps todos to tasks and returns array', async () => {
    const todos = [todoDto(), todoDto({id: 'tid-2', title: 'Two'})];
    mockedApiClient.get.mockResolvedValueOnce({data: {todos}});
    const result = await fetchTaskList();
    expect(mockedApiClient.get).toHaveBeenCalledWith('/api/todo/list');
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'tid-1',
      title: 'Task one',
      description: 'Desc',
      completed: false,
      createdAt: '2023-01-01T00:00:00Z',
    });
    expect(result[1].title).toBe('Two');
  });

  it('returns empty array when todos is missing', async () => {
    mockedApiClient.get.mockResolvedValueOnce({data: {}});
    const result = await fetchTaskList();
    expect(result).toEqual([]);
  });

  it('maps missing description to empty string', async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: {todos: [todoDto({description: undefined})]},
    });
    const result = await fetchTaskList();
    expect(result[0].description).toBe('');
  });
});

describe('fetchTask', () => {
  it('fetches single task and maps to Task', async () => {
    const dto = todoDto({id: 'tid-42'});
    mockedApiClient.get.mockResolvedValueOnce({data: dto});
    const result = await fetchTask('tid-42');
    expect(mockedApiClient.get).toHaveBeenCalledWith('/api/todo/tid-42');
    expect(result.id).toBe('tid-42');
    expect(result.title).toBe(dto.title);
    expect(result.description).toBe(dto.description);
  });
});

describe('createTask', () => {
  it('posts trimmed title and optional description', async () => {
    const dto = todoDto({id: 'new-id'});
    mockedApiClient.post.mockResolvedValueOnce({data: dto});
    await createTask({title: '  New task  ', description: '  desc  '});
    expect(mockedApiClient.post).toHaveBeenCalledWith('/api/todo', {
      title: 'New task',
      description: 'desc',
    });
  });

  it('sends undefined description when empty', async () => {
    mockedApiClient.post.mockResolvedValueOnce({data: todoDto()});
    await createTask({title: 'Only title', description: ''});
    expect(mockedApiClient.post).toHaveBeenCalledWith('/api/todo', {
      title: 'Only title',
      description: undefined,
    });
  });
});

describe('updateTask', () => {
  it('puts updates to correct path', async () => {
    mockedApiClient.put.mockResolvedValueOnce(undefined);
    await updateTask('tid-1', {title: 'Updated', description: 'New desc'});
    expect(mockedApiClient.put).toHaveBeenCalledWith('/api/todo/tid-1', {
      title: 'Updated',
      description: 'New desc',
    });
  });
});

describe('deleteTask', () => {
  it('deletes correct id', async () => {
    mockedApiClient.delete.mockResolvedValueOnce(undefined);
    await deleteTask('tid-1');
    expect(mockedApiClient.delete).toHaveBeenCalledWith('/api/todo/tid-1');
  });
});

describe('setTaskCompleted', () => {
  it('posts to complete when completed is true', async () => {
    mockedApiClient.post.mockResolvedValueOnce(undefined);
    await setTaskCompleted('tid-1', true);
    expect(mockedApiClient.post).toHaveBeenCalledWith('/api/todo/tid-1/complete');
  });

  it('posts to incomplete when completed is false', async () => {
    mockedApiClient.post.mockResolvedValueOnce(undefined);
    await setTaskCompleted('tid-1', false);
    expect(mockedApiClient.post).toHaveBeenCalledWith('/api/todo/tid-1/incomplete');
  });
});
