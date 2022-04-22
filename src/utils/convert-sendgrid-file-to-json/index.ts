import { SendgridApiKeyNotFound } from '../../errors';
import { SaveSendgridConfig } from '../../interfaces/sendgrid.interface';

export const convertSendgridFileToJson = (
  fileResponse: string
): SaveSendgridConfig => {
  if (!fileResponse) {
    console.error(new SendgridApiKeyNotFound().message);
    return null;
  }
  const sendgrid = JSON.parse(fileResponse);
  if (!sendgrid) {
    console.error(new SendgridApiKeyNotFound().message);
    return null;
  }
  return sendgrid;
};
