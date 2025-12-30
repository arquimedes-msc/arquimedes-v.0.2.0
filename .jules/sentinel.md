## 2024-08-05 - Enforced Secure JWT Secret Configuration
**Vulnerability:** The application's JWT secret (`JWT_SECRET`) defaulted to an empty string if not set in the environment variables. This critical vulnerability would allow an attacker to easily forge authentication tokens by signing them with an empty secret, granting unauthorized access to the application. Additionally, a weak, hardcoded secret was found in a deployment script.
**Learning:** The application was not designed to "fail securely." Instead of halting when a critical security component was misconfigured, it continued to operate in an insecure state. This highlights the importance of validating critical environment variables at startup.
**Prevention:** For all security-critical secrets (like JWT keys, API keys, etc.), implement a startup check in the application's entry point. This check should validate that the secret exists and meets minimum strength requirements (e.g., length). If the check fails, the application must throw a fatal error and refuse to start, preventing it from ever running in a vulnerable state.

## 2025-05-23 - Removed Hardcoded Database Credentials
**Vulnerability:** A script `insert_aulas.mjs` contained hardcoded production database credentials (host, user, password) for a TiDB instance. This exposed the database to anyone with access to the codebase.
**Learning:** Developers often create "one-off" scripts for data seeding or maintenance and hardcode credentials for convenience, forgetting to remove them before committing.
**Prevention:** Always use environment variables for credentials, even in temporary scripts. Add tools like `git-secrets` or pre-commit hooks to scan for potential secrets before allowing commits.
