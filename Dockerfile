# Install dependencies only when needed
FROM node:16.19.1-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Rebuild the source code only when needed
FROM node:16.19.1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_GA_TRACKING_CODE
ARG NEXT_PUBLIC_GTM_CODE
ARG ANALYZE $ANALYZE
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NEXT_PUBLIC_FB_CONVERSION_ACCESS_TOKEN
ARG NEXT_PUBLIC_FB_CONVERSION_ADS_PIXEL_ID
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_RELEASE
ENV NEXT_PUBLIC_GA_TRACKING_CODE $NEXT_PUBLIC_GA_TRACKING_CODE
ENV NEXT_PUBLIC_GTM_CODE $NEXT_PUBLIC_GTM_CODE
ENV NEXT_PUBLIC_API_URL $NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ENVIRONMENT $NEXT_PUBLIC_ENVIRONMENT
ENV NEXT_PUBLIC_FB_CONVERSION_ACCESS_TOKEN $NEXT_PUBLIC_FB_CONVERSION_ACCESS_TOKEN
ENV NEXT_PUBLIC_FB_CONVERSION_ADS_PIXEL_ID $NEXT_PUBLIC_FB_CONVERSION_ADS_PIXEL_ID
ENV NEXT_PUBLIC_SITE_URL $NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SENTRY_DSN $NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_AUTH_TOKEN $NEXT_PUBLIC_SENTRY_AUTH_TOKEN
ENV NEXT_PUBLIC_SENTRY_RELEASE $NEXT_PUBLIC_SENTRY_RELEASE
RUN yarn build

# Production image, copy all the files and run next
FROM node:16.19.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]