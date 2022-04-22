import { EmailNotFound, PasswordNotFound } from '../errors';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = {
  name: 'login',
  description: 'Autenticação de administrador.',
  run: async (toolbox: Toolbox) => {
    const { login, prompt, print } = toolbox;

    try {
      const { email } = await prompt.ask({
        name: 'email',
        type: 'input',
        message: 'Qual o seu email?'
      });
      if (!email) {
        print.error(new EmailNotFound().message);
        return;
      }
      const { password } = await prompt.ask({
        name: 'password',
        type: 'input',
        message: 'Qual a sua senha?'
      });
      if (!password) {
        print.error(new PasswordNotFound().message);
        return;
      }
      await login({ email, password });
    } catch (error) {
      print.error(error);
    }
  }
};
