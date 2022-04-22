import { SendgridApiKeyNotFound } from '../errors';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = {
  name: 'sendgrid',
  description: 'Adiciona as configurações do Sendgrid',
  run: async (toolbox: Toolbox) => {
    const { saveSendgridConfig, prompt, print } = toolbox;

    try {
      const { apiKey } = await prompt.ask({
        name: 'apiKey',
        type: 'input',
        message: 'Qual a sua Chave de API do Sendgrid?'
      });

      if (!apiKey) {
        print.error(new SendgridApiKeyNotFound().message);
        return;
      }
      await saveSendgridConfig({ apiKey });
    } catch (error) {
      print.error(error);
    }
  }
};
