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

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
}

export const WelcomeEmail = ({ userName, userEmail }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for reaching out - Mahmoud Jaderi</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Mahmoud Jaderi</Heading>
          <Text style={subtitle}>Full Stack Developer</Text>
        </Section>

        <Section style={content}>
          <Heading style={h2}>Hello {userName},</Heading>

          <Text style={paragraph}>
            Thank you for reaching out to me through my portfolio! I&apos;ve received
            your message and I&apos;m excited to connect with you.
          </Text>

          <Text style={paragraph}>
            I typically respond to all inquiries within 24 hours during business
            days. In the meantime, I&apos;d love to share a bit more about my work
            and how I can help bring your ideas to life.
          </Text>

          <Section style={highlightSection}>
            <Heading style={h3}>What I Do</Heading>
            <Text style={highlightText}>
              I specialize in building modern, scalable web applications using
              cutting-edge technologies like React, Next.js, TypeScript, and
              Node.js. From concept to deployment, I help businesses and
              individuals create exceptional digital experiences.
            </Text>
          </Section>

          <Section style={servicesSection}>
            <Heading style={h3}>Services I Offer</Heading>
            <Text style={serviceItem}>• Full-stack web development</Text>
            <Text style={serviceItem}>
              • Frontend development with React/Next.js
            </Text>
            <Text style={serviceItem}>• Backend development with Node.js</Text>
            <Text style={serviceItem}>• Database design and optimization</Text>
            <Text style={serviceItem}>• API development and integration</Text>
            <Text style={serviceItem}>• Performance optimization</Text>
            <Text style={serviceItem}>• Technical consulting</Text>
          </Section>

          <Text style={paragraph}>
            I&apos;m passionate about creating clean, maintainable code and
            delivering solutions that exceed expectations. Whether you have a
            specific project in mind or just want to explore possibilities, I&apos;m
            here to help.
          </Text>

          <Text style={paragraph}>
            I&apos;ll be in touch soon with a detailed response to your inquiry. In
            the meantime, feel free to explore my portfolio to see examples of
            my work.
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
            <strong>Contact Information:</strong>
          </Text>
          <Text style={footerText}>
            Email:{" "}
            <Link href="mailto:mjaderi97@gmail.com" style={link}>
              mjaderi97@gmail.com
            </Link>
          </Text>
          <Text style={footerText}>
            Portfolio:{" "}
            <Link href="https://mahmoudjaderi.com" style={link}>
              mahmoudjaderi.com
            </Link>
          </Text>
          <Text style={footerText}>
            GitHub:{" "}
            <Link href="https://github.com/alghaibb" style={link}>
              github.com/alghaibb
            </Link>
          </Text>
          <Text style={footerText}>
            LinkedIn:{" "}
            <Link href="https://linkedin.com/in/mahmoud-jaderi" style={link}>
              linkedin.com/in/mahmoud-jaderi
            </Link>
          </Text>
          <Text style={footerText}>
            <strong>Your Email:</strong> {userEmail}
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
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 8px",
};

const subtitle = {
  color: "#e2e8f0",
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

const highlightSection = {
  backgroundColor: "#f0f9ff",
  padding: "20px",
  borderRadius: "8px",
  margin: "24px 0",
  borderLeft: "4px solid #0ea5e9",
};

const highlightText = {
  color: "#0c4a6e",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
};

const servicesSection = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "8px",
  margin: "24px 0",
  border: "1px solid #e2e8f0",
};

const serviceItem = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "8px 0",
  paddingLeft: "8px",
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
  margin: "4px 0",
  textAlign: "center" as const,
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};

export default WelcomeEmail;
