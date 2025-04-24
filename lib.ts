import { cookies } from "next/headers";
import crypto from "crypto";

const secret = process.env.SECRET_KEY || "your-secret-key"; // Store in env!

function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(secret), Buffer.alloc(16, 0));
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  return decrypt(session);
}
