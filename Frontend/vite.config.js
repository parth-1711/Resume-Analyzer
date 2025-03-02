import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["ec2-13-60-92-220.eu-north-1.compute.amazonaws.com"],
    host: "0.0.0.0", // Allows external access
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
