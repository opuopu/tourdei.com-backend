# Security Note

Embedded Cloudinary credentials were discovered in source code and removed.

Remediation steps:
- Rotate or revoke the exposed Cloudinary keys immediately.
- Add replacement Cloudinary keys only in deployment environment variables.
- Enable and monitor repository secret scanning.
- Do not commit secrets to source control.
