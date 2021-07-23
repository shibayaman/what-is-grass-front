import { rest } from 'msw';
import {
  editUser,
  getUser,
  login,
  logout,
  newUser,
  getLoginUser,
} from './resolvers/user';
import {
  newQuestion,
  getQuestions,
  getUserQuestions,
} from './resolvers/question';
import { newAnswer, getAnswer } from './resolvers/answer';

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
