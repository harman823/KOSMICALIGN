import { loadEnvConfig } from "@next/env"
import type { NextConfig } from "next"
import { fileURLToPath } from "node:url"

const adminRoot = fileURLToPath(new URL(".", import.meta.url))
const backendRoot = fileURLToPath(new URL("../../backend", import.meta.url))

loadEnvConfig(backendRoot)

const nextConfig: NextConfig = {
  turbopack: {
    root: adminRoot,
  },
}

export default nextConfig
