FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

#ARG API_URL
#ENV API_URL=${API_URL}

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apk add --no-cache --upgrade bash

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY  --chown=nextjs:nodejs entrypoint.sh .
COPY --chown=nextjs:nodejs .env.production .

#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
#COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
#COPY --from=builder --chown=nextjs:nodejs /app/entrypoint.sh ./entrypoint.sh
#COPY --from=builder --chown=nextjs:nodejs /app/.env.production ./.env.production

#RUN ["chmod", "7777", "./entrypoint.sh"]
RUN ["chmod", "-R", "7777", "."]
#RUN ["chmod", "-R", "7777", "./"]
#RUN ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

USER nextjs

EXPOSE 8000

ENV PORT 8000

CMD ["node", "server.js"]
