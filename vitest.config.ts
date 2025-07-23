import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./tests/setup.ts"],
		coverage: {
			exclude: ["demo/**", ...coverageConfigDefaults.exclude],
		},
	},
});
