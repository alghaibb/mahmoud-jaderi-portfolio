import { render } from "@react-email/components";
import { ContactReplyEmail } from "@/emails/ContactReplyEmail";
import { ContactNotificationEmail } from "@/emails/ContactNotificationEmail";
import { WelcomeEmail } from "@/emails/WelcomeEmail";

export const renderContactReplyEmail = (props: {
  userName: string;
  userEmail: string;
  originalSubject: string;
  originalMessage: string;
  replyMessage: string;
  originalDate: string;
}) => {
  return render(ContactReplyEmail(props));
};

export const renderContactNotificationEmail = (props: {
  userName: string;
  userEmail: string;
  userPhone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}) => {
  return render(ContactNotificationEmail(props));
};

export const renderWelcomeEmail = (props: {
  userName: string;
  userEmail: string;
}) => {
  return render(WelcomeEmail(props));
}; 