import { rest } from 'msw';
import { getAnswer, newAnswer } from './resolvers/answer';
import {
  getQuestions,
  getUserQuestions,
  newQuestion,
} from './resolvers/question';
import {
  editUser,
  getLoginUser,
  getUser,
  login,
  logout,
  newUser,
} from './resolvers/user';

export const handlers = [
  rest.get('/user', getUser),
  rest.get('/question', getQuestions),
  rest.get('/user/question-list', getUserQuestions),
  rest.get('/answer', getAnswer),
  rest.get('/whoami', getLoginUser),
  rest.post('/question', newQuestion),
  rest.post('/answer', newAnswer),
  rest.post('/signup', newUser),
  rest.post('/user/edit', editUser),
  rest.post('/login', login),
  rest.post('/logout', logout),
];
