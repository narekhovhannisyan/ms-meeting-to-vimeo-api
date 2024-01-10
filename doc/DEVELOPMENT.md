# Development ⚠

## Environment Variables

 Required Environment Variables.

| Variable name | Description |
| ------------- | ----------- |
| `*`           | *           |

 Optional Environment Variables.

| Variable name                 | Description                      | Default                                |
| ----------------------------- | -------------------------------- | -------------------------------------- |
| `MODE`                        | Node environment                 | `development`                          |
| `PORT`                        | Server port                      | `3010`                                 |
| `RETRY_AFTER_HEADER`          | Retry after header for 503 error | `2 * 60 * 60`                          |
| `SESSION_SECRET`              | Session secret                   | `secret`                               |
| `VERIFICATION_EXPIRE`         | Verification id expiration       | `60 * 10 // 10 minutes`                |

*[⬅️ back to the root](/README.md#ms-meeting-to-vimeo-api)*
