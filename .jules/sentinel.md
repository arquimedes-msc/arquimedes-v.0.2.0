## 2024-08-05 - Enforced Secure JWT Secret Configuration
**Vulnerability:** The application's JWT secret (`JWT_SECRET`) defaulted to an empty string if not set in the environment variables. This critical vulnerability would allow an attacker to easily forge authentication tokens by signing them with an empty secret, granting unauthorized access to the application. Additionally, a weak, hardcoded secret was found in a deployment script.
**Learning:** The application was not designed to "fail securely." Instead of halting when a critical security component was misconfigured, it continued to operate in an insecure state. This highlights the importance of validating critical environment variables at startup.
**Prevention:** For all security-critical secrets (like JWT keys, API keys, etc.), implement a startup check in the application's entry point. This check should validate that the secret exists and meets minimum strength requirements (e.g., length). If the check fails, the application must throw a fatal error and refuse to start, preventing it from ever running in a vulnerable state.

## 2025-01-08 - Unvalidated File Uploads
**Vulnerability:** The `updateAvatar` endpoint blindly accepted base64 strings, assuming they were valid JPEG images and saving them without checking size or content type. This could lead to Denial of Service (DoS) via large files or saving of malicious content with incorrect extensions.
**Learning:** Never trust client-provided file content or MIME types blindly. Input validation must happen before any processing (decoding/saving) occurs.
**Prevention:** Implemented strict regex validation for Data URI schemes to enforce allowed MIME types (JPEG, PNG, WebP) and added a check on the decoded buffer size (max 5MB) before processing.
