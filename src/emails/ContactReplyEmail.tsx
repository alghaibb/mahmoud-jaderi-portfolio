import { env } from "@/lib/env";
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
} from "@react-email/components";
import * as React from "react";

interface ContactReplyEmailProps {
  userName: string;
  originalSubject: string;
  originalMessage: string;
  replyMessage: string;
  originalDate: string;
}

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export const ContactReplyEmail = ({
  userName,
  originalSubject,
  originalMessage,
  replyMessage,
  originalDate,
}: ContactReplyEmailProps) => (
  <Html>
    <Head />
    <Preview>Reply from Mahmoud Jaderi - {originalSubject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Mahmoud Jaderi</Heading>
          <Text style={subtitle}>Full Stack Developer</Text>
        </Section>

        <Section style={content}>
          <Heading style={h2}>Hello {userName},</Heading>

          <Text style={paragraph}>
            Thank you for reaching out to me. I've received your message and I'm
            happy to provide you with a response.
          </Text>

          <Section style={replySection}>
            <Heading style={h3}>My Reply:</Heading>
            <Text style={replyText}>{replyMessage}</Text>
          </Section>

          <Section style={originalSection}>
            <Heading style={h3}>Your Original Message:</Heading>
            <Text style={originalText}>
              <strong>Subject:</strong> {originalSubject}
            </Text>
            <Text style={originalText}>
              <strong>Date:</strong> {originalDate}
            </Text>
            <Text style={originalMessageText}>{originalMessage}</Text>
          </Section>

          <Text style={paragraph}>
            If you have any follow-up questions or need further assistance,
            please don't hesitate to reach out. I'm here to help!
          </Text>

          <Text style={paragraph}>
            Best regards,
            <br />
            <strong>Mahmoud Jaderi</strong>
            <br />
            Full Stack Developer
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            This email was sent in response to your contact form submission.
          </Text>
          <Text style={footerText}>
            You can reach me at{" "}
            <Link href="mailto:mjaderi97@gmail.com" style={link}>
              mjaderi97@gmail.com
            </Link>
          </Text>
          <Text style={footerText}>
            View my portfolio at{" "}
            <Link href={baseUrl} style={link}>
              {baseUrl}
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  textAlign: "center" as const,
  padding: "32px 0",
  borderBottom: "1px solid #e1e5e9",
};

const h1 = {
  color: "#1f2937",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 8px",
};

const subtitle = {
  color: "#6b7280",
  fontSize: "16px",
  margin: "0",
};

const content = {
  padding: "32px 48px",
};

const h2 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const h3 = {
  color: "#374151",
  fontSize: "18px",
  fontWeight: "600",
  margin: "24px 0 12px",
};

const paragraph = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const replySection = {
  backgroundColor: "#f3f4f6",
  padding: "20px",
  borderRadius: "8px",
  margin: "24px 0",
  borderLeft: "4px solid #3b82f6",
};

const replyText = {
  color: "#1f2937",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const originalSection = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "8px",
  margin: "24px 0",
  border: "1px solid #e5e7eb",
};

const originalText = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "4px 0",
};

const originalMessageText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "12px 0 0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  padding: "32px 48px",
  borderTop: "1px solid #e1e5e9",
  backgroundColor: "#f9fafb",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "8px 0",
  textAlign: "center" as const,
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};

export default ContactReplyEmail;
