export interface Mail {
  readonly name: string;
  readonly email: string;
}
export interface SendMailSendgridConfig {
  readonly templateId?: string;
}
export interface SendMailConfig {
  readonly emails: Mail[];
  readonly sendgrid?: SendMailSendgridConfig;
}
