# External Setup Requirements

**🛑 CRITICAL: Complete these external service setups before implementation**

## Required External Services

### 1. Google OAuth Setup

**Purpose**: User authentication via Google accounts

**Steps to complete:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the following APIs:
   - Google+ API
   - Google OAuth2 API
   - Google People API (for profile data)
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen
6. Set authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

**Required Environment Variables:**

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 2. GitHub OAuth Setup

**Purpose**: Repository access and analysis

**Steps to complete:**

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in application details:
   - Application name: "Skills Evaluation App"
   - Homepage URL: `http://localhost:3000` (dev) or your domain
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Note down Client ID and generate Client Secret

**Required Environment Variables:**

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Required Scopes:**

- `repo` (for private repository access)
- `user:email` (for user email access)
- `read:user` (for user profile data)

### 3. OpenAI API Setup

**Purpose**: AI-powered skill recommendations and chat interface

**Steps to complete:**

1. Create account at [OpenAI Platform](https://platform.openai.com/)
2. Add payment method (required for API access)
3. Go to API Keys section
4. Create new API key
5. Set usage limits and monitoring

**Required Environment Variables:**

```env
OPENAI_API_KEY=your_openai_api_key
```

**Recommended Settings:**

- Model: GPT-4 or GPT-3.5-turbo
- Set monthly usage limits
- Enable usage monitoring

### 4. PostgreSQL Database Setup

**Purpose**: Primary data storage for users, repositories, skills, and AI interactions

**Option A - Local Development:**

```bash
# Install PostgreSQL locally
brew install postgresql
brew services start postgresql
createdb skills_evaluation_dev
```

**Option B - Hosted Solutions:**

- [Supabase](https://supabase.com/) (recommended - includes auth)
- [Neon](https://neon.tech/) (serverless PostgreSQL)
- [Railway](https://railway.app/) (simple deployment)
- [PlanetScale](https://planetscale.com/) (MySQL alternative)

**Required Environment Variables:**

```env
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### 5. Redis Setup

**Purpose**: Session storage, caching, and query optimization

**Option A - Local Development:**

```bash
# Install Redis locally
brew install redis
brew services start redis
```

**Option B - Hosted Solutions:**

- [Upstash](https://upstash.com/) (recommended - serverless)
- [Redis Cloud](https://redis.com/redis-enterprise-cloud/)
- [Railway Redis](https://railway.app/)

**Required Environment Variables:**

```env
REDIS_URL=redis://username:password@host:port
```

### 6. NextAuth Configuration

**Purpose**: Authentication session management

**Required Environment Variables:**

```env
NEXTAUTH_SECRET=your_random_secret_key_32_chars_min
NEXTAUTH_URL=http://localhost:3000
```

**Generate secret:**

```bash
openssl rand -base64 32
```

## Complete Environment Variables Template

Create `.env.local` file in project root:

```env
# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# OpenAI
OPENAI_API_KEY=

# Database
DATABASE_URL=

# Redis
REDIS_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Optional - Development
NODE_ENV=development
```

## Security Considerations

### Development vs Production

- Use different OAuth apps for dev/staging/production
- Use separate databases for each environment
- Never commit real API keys to version control
- Use different NEXTAUTH_SECRET for each environment

### API Key Security

- Store API keys in environment variables only
- Use least-privilege access (minimal required scopes)
- Regularly rotate API keys
- Monitor API usage for unusual activity
- Set up billing alerts for OpenAI usage

### Database Security

- Use connection pooling for production
- Enable SSL/TLS for database connections
- Regular database backups
- Implement proper user permissions

## Testing Accounts

**Recommendation**: Create separate "test" accounts for development:

- Test Google account for OAuth testing
- Test GitHub account with sample repositories
- Separate OpenAI project for development usage

## Cost Estimates (Monthly)

**Development:**

- Google OAuth: Free
- GitHub OAuth: Free
- OpenAI API: $5-20 (depending on usage)
- Database (Supabase): Free tier available
- Redis (Upstash): Free tier available
- **Total: $5-20/month**

**Production (estimated):**

- Google OAuth: Free
- GitHub OAuth: Free
- OpenAI API: $20-100 (depending on users)
- Database: $10-25
- Redis: $10-25
- **Total: $40-150/month**

## Setup Verification Checklist

Before starting implementation, verify:

- [x] Google OAuth app created and configured
- [ ] GitHub OAuth app created with correct scopes
- [ ] OpenAI API key generated and billing set up
- [ ] Database created and accessible
- [ ] Redis instance running and accessible
- [ ] All environment variables added to `.env.local`
- [ ] Test authentication flows work
- [ ] API keys have appropriate permissions
- [ ] Billing alerts configured for paid services

## Next Steps After Setup

Once all external services are configured:

1. Start with Task 1: Initialize Next.js 15 project
2. Configure environment variables
3. Test each service connection individually
4. Begin implementation following the task order

## Support Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Upstash Redis Documentation](https://docs.upstash.com/)
