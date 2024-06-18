import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Text,
  Preview,
  Section,
  Row,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  email,
  subject,
  message,
}: ContactEmailProps) => {
  const previewText = `New message from ${email}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>
                New contact form submission from your website
              </Text>
              <Text style={paragraph}>
                <strong>From:</strong> {email}
              </Text>
              <Text style={paragraph}>
                <strong>Subject:</strong> {subject}
              </Text>
              <Text style={paragraph}>
                <strong>Message:</strong> {message}
              </Text>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Row>
              <Text style={footer}>
                This message was sent from your website&apos;s contact form.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};
