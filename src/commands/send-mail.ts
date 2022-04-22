import { AuthorizationTokenNotFound, EmailNotFound } from '../errors';
import { Toolbox } from '../interfaces/toolbox.interface';

enum CommandChoice {
  ALL_COURSES = 'Todos cursos',
  ALL_STUDENTS = 'Todos estudantes',
  WITHOUT_COURSES = 'Todos estudantes sem cursos',
  ANYONE = 'Alguém'
}

module.exports = {
  name: 'send:mail',
  description: 'Comando para envio de emails.',
  run: async (toolbox: Toolbox) => {
    const {
      sendMails,
      findCurrentUser,
      findStudentsWithCourses,
      findAllStudents,
      findStudentsWithoutCourses,
      print,
      prompt
    } = toolbox;

    try {
      const { command } = await prompt.ask({
        name: 'command',
        type: 'select',
        message: 'Para quem você quer enviar?',
        choices: [
          CommandChoice.ALL_COURSES,
          CommandChoice.ALL_STUDENTS,
          CommandChoice.WITHOUT_COURSES,
          CommandChoice.ANYONE
        ]
      });

      const currentUser = await findCurrentUser();
      if (!currentUser) {
        print.error(new AuthorizationTokenNotFound().message);
        return;
      }

      const accessConfig = {
        accessToken: currentUser.loginData.accessToken
      };

      if (command === CommandChoice.ALL_COURSES) {
        const response = await findStudentsWithCourses(accessConfig);
        await sendMails({
          emails: response.items
        });
        return;
      }

      if (command === CommandChoice.ALL_STUDENTS) {
        const response = await findAllStudents(accessConfig);
        await sendMails({
          emails: response.items
        });
        return;
      }

      if (command === CommandChoice.WITHOUT_COURSES) {
        const response = await findStudentsWithoutCourses(accessConfig);
        await sendMails({
          emails: response.items
        });
        return;
      }

      if (command === CommandChoice.ANYONE) {
        const { email } = await prompt.ask({
          name: 'email',
          type: 'input',
          message: 'Qual o email da pessoa?'
        });
        if (!email) {
          print.error(new EmailNotFound().message);
          return;
        }
        const { name } = await prompt.ask({
          name: 'name',
          type: 'input',
          message: 'Qual o nome da pessoa?'
        });

        await sendMails({
          emails: [
            {
              email: email,
              name: name
            }
          ]
        });
        return;
      }
      print.error('Comando inválido!');
    } catch (error) {
      print.error(error);
    }
  }
};
