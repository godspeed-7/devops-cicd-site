# DevOps CI/CD Site (Assignment Q2)

Static site deployed to Amazon S3 and served through CloudFront by GitHub Actions on every push to `main`.

**Live URL:** https://d3qtbsw4l324fd.cloudfront.net

## Pipeline
Push to `main` → **Test** (file check, HTML lint, content check) → **Build / Package** (bundle into `dist/`) → **Deploy** (S3 sync + CloudFront cache invalidation).

## AWS authentication (GitHub OIDC)
The Deploy job authenticates to AWS with **GitHub OIDC** instead of stored access keys:
- IAM OIDC identity provider: `token.actions.githubusercontent.com`
- IAM role `github-actions-deploy-role`, assumable only by this repository's `main` branch
- Role permissions limited to this S3 bucket and invalidations on this CloudFront distribution

No long-lived AWS credentials are stored in GitHub.

## Configuration
| Setting | Where | Value |
|---|---|---|
| AWS region | workflow `env` | `eu-north-1` |
| S3 bucket | workflow `env` | `ankit-devops-cicd-site-569498795435` |
| CloudFront distribution ID | repo secret `CLOUDFRONT_DISTRIBUTION_ID` | `ERJ84J2RTENGD` |
| Deploy role | workflow (`role-to-assume`) | `github-actions-deploy-role` |

## Releasing a new version
Edit the version in `index.html`, commit, and push to `main`. The pipeline deploys it automatically and invalidates the CloudFront cache.
