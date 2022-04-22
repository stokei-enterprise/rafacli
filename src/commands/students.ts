import { AuthorizationTokenNotFound } from '../errors';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = {
  name: 'students',
  description: 'Comandos para gerenciamento dos alunos.',
  run: async (toolbox: Toolbox) => {
    const {
      findCurrentUser,
      findAllStudents,
      print,
      parameters: { first: command }
    } = toolbox;

    const currentUser = await findCurrentUser();
    if (!currentUser) {
      print.error(new AuthorizationTokenNotFound().message);
      return;
    }

    if (command === 'list') {
      const response = await findAllStudents({
        accessToken: currentUser.loginData.accessToken
      });
      console.table(response?.items || []);
    }
  }
};
