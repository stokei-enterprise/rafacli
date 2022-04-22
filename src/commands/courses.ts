import { AuthorizationTokenNotFound } from '../errors';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = {
  name: 'courses',
  description: 'Comandos para gerenciamento dos cursos.',
  run: async (toolbox: Toolbox) => {
    const {
      findCurrentUser,
      findAllCourses,
      print,
      parameters: { first: command }
    } = toolbox;

    const currentUser = await findCurrentUser();
    if (!currentUser) {
      print.error(new AuthorizationTokenNotFound().message);
      return;
    }

    if (command === 'list') {
      const response = await findAllCourses({
        accessToken: currentUser.loginData.accessToken
      });
      console.table(response?.items || []);
    }
  }
};
