import GitHub from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

export default {
  providers: [GitHub],
} satisfies NextAuthConfig;

// Reference: https://authjs.dev/guides/upgrade-to-v5#edge-compatibility
