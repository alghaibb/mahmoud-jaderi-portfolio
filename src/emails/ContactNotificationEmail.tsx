import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactNotificationEmailProps {
  userName: string;
  userEmail: string;
  userPhone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export const ContactNotificationEmail = ({
  userName,
  userEmail,
  userPhone,
  subject,
  message,
  submittedAt,
}: ContactNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission from {userName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>New Contact Message</Heading>
          <Text style={subtitle}>Portfolio Contact Form</Text>
        </Section>

        <Section style={content}>
          <Heading style={h2}>Contact Details</Heading>
          
          <Section style={infoSection}>
            <Text style={infoText}>
              <strong>Name:</strong> {userName}
            </Text>
            <Text style={infoText}>
              <strong>Email:</strong> {userEmail}
            </Text>
            {userPhone && (
              <Text style={infoText}>
                <strong>Phone:</strong> {userPhone}
              </Text>
            )}
            <Text style={infoText}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={infoText}>
              <strong>Submitted:</strong> {submittedAt}
            </Text>
          </Section>

          <Section style={messageSection}>
            <Heading style={h3}>Message:</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={actionSection}>
            <Text style={actionText}>
              <Link href={`mailto:${userEmail}?subject=Re: ${subject}`} style={actionLink}>
                Reply to this message
              </Link>
            </Text>
          </Section>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            This notification was sent from your portfolio contact form.
          </Text>
          <Text style={footerText}>
            You can manage contact messages in your{' '}
            <Link href="https://mahmoudjaderi.com/admin" style={link}>
              admin dashboard
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
  padding: '32px 0',
  borderBottom: '1px solid #e1e5e9',
  backgroundColor: '#3b82f6',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const subtitle = {
  color: '#dbeafe',
  fontSize: '16px',
  margin: '0',
};

const content = {
  padding: '32px 48px',
};

const h2 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const h3 = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: '600',
  margin: '24px 0 12px',
};

const infoSection = {
  backgroundColor: '#f8fafc',
  padding: '20px',
  borderRadius: '8px',
  margin: '16px 0',
  border: '1px solid #e2e8f0',
};

const infoText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
};

const messageSection = {
  backgroundColor: '#f3f4f6',
  padding: '20px',
  borderRadius: '8px',
  margin: '24px 0',
  borderLeft: '4px solid #10b981',
};

const messageText = {
  color: '#1f2937',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const actionSection = {
  textAlign: 'center' as const,
  padding: '24px 0',
  margin: '24px 0',
  borderTop: '1px solid #e5e7eb',
};

const actionText = {
  color: '#374151',
  fontSize: '16px',
  margin: '0',
};

const actionLink = {
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'inline-block',
};

const footer = {
  padding: '32px 48px',
  borderTop: '1px solid #e1e5e9',
  backgroundColor: '#f9fafb',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

export default ContactNotificationEmail; 