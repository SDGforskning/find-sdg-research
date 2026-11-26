export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerNodeEnv } = await import("./instrumentation.node");
    await registerNodeEnv();
  }
}
