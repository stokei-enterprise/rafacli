import { SENDGRID_DATA_JSON_PATH } from '../constants/api';
import { SendgridApiKeyNotFound } from '../errors';
import { SaveSendgridConfig } from '../interfaces/sendgrid.interface';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.saveSendgridConfig = async (
    data: SaveSendgridConfig
  ): Promise<void> => {
    try {
      const sendgridApiKey = data?.apiKey;
      if (!sendgridApiKey) {
        toolbox.print.error(new SendgridApiKeyNotFound().message);
        return null;
      }
      toolbox.filesystem.write(
        SENDGRID_DATA_JSON_PATH,
        JSON.stringify({
          apiKey: sendgridApiKey
        })
      );
      toolbox.print.success('Saved with success!');
    } catch (error) {
      toolbox.print.error(error);
    }
  };
};
