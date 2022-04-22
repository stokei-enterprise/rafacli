import { sendgridClient } from '../clients/sendgrid';
import { SENDGRID_DATA_JSON_PATH } from '../constants/api';
import { SendgridApiKeyNotFound } from '../errors';
import { SendMailConfig } from '../interfaces/send-mail.interface';
import { Toolbox } from '../interfaces/toolbox.interface';
import { convertSendgridFileToJson } from '../utils/convert-sendgrid-file-to-json';

module.exports = (toolbox: Toolbox) => {
  toolbox.sendMails = async ({ emails }: SendMailConfig): Promise<any> => {
    const sendgridJSONData = convertSendgridFileToJson(
      toolbox.filesystem.read(SENDGRID_DATA_JSON_PATH)
    );
    if (!sendgridJSONData?.apiKey) {
      toolbox.print.error(new SendgridApiKeyNotFound().message);
      return;
    }

    sendgridClient.setApiKey(sendgridJSONData.apiKey);

    const msg = {
      from: 'Rafael Bernardes <contact@stokei.com>',
      replyTo: 'Rafael Bernardes <contato@rbernardes.com.br>',
      templateId: 'd-0e257d33a00f433d8a3244955e158791'
    };

    toolbox.print.info(`Count emails: ${emails.length}`);
    if (emails.length > 0) {
      emails.forEach(async (email) => {
        try {
          const sended = await sendgridClient.send({
            ...msg,
            to: email.name
              ? `${email.name} <${email.email}>`
              : `<${email.email}>`
          });
          toolbox.print.success(
            `${email?.email} -> ${sended[0].statusCode === 202}`
          );
        } catch (error) {
          toolbox.print.error(`${email} -> ${JSON.stringify({ error })}`);
        }
      });
    }
    return;
  };
};
