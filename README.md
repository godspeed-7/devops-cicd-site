# DevOps CI/CD Site (Assignment Q2)

Static site deployed to S3 + CloudFront by GitHub Actions on every push to `main`.

Pipeline: Push → Test (file check, HTML lint, content check) → Build (package to `dist/`) → Deploy (S3 sync + CloudFront invalidation).

## GitHub secrets required
| Secret | Example |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret |
| `AWS_REGION` | `eu-north-1` |
| `S3_BUCKET` | `ankit-devops-cicd-site-569498795435` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1ABCDEF23GHIJ` |

## Minimal IAM policy for the deploy user
```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": ["s3:ListBucket"], "Resource": "arn:aws:s3:::BUCKET" },
    { "Effect": "Allow", "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"], "Resource": "arn:aws:s3:::BUCKET/*" },
    { "Effect": "Allow", "Action": ["cloudfront:CreateInvalidation"], "Resource": "*" }
  ]
}
```

## Version bump for the final demo
Change `1.0` → `2.0` in `index.html`, commit, push to `main`, and watch the Actions run deploy it.
