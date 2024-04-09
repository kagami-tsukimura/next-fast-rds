FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock* ./
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY ./public ./src/public
COPY ./next.config.mjs ./src
COPY ./tsconfig.json ./src
COPY ./tailwind.config.ts ./src

CMD ["yarn", "dev"]

