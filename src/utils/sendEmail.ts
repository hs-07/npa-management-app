import emailjs, { type EmailJSResponseStatus } from "emailjs-com";

export interface EmailTemplateParams {
  name: string;
  email: string;
  accountNumber: string;
  branch: string;
  loanAmount: string;
  npaDate: string;
}

export const sendEmail = (
  data: EmailTemplateParams
): Promise<EmailJSResponseStatus> => {
  return emailjs.send(
    import.meta.env.VITE_EMAIL_SERVICE_ID as string,
    import.meta.env.VITE_EMAIL_TEMPLATE_ID as string,
    // cast here
    data as unknown as Record<string, unknown>,
    import.meta.env.VITE_EMAIL_PUBLIC_KEY as string
  );
};
