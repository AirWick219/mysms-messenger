# Stage 1: Build Angular frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build -- --configuration production --project frontend

# Stage 2: Build Rails app
FROM ruby:3.3-slim AS rails-build
ENV BUNDLER_VERSION=2.5.5

WORKDIR /app

# Install build dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  libyaml-dev \
  git \
  curl \
  && rm -rf /var/lib/apt/lists/*


# Install bundler
RUN gem install bundler -v "$BUNDLER_VERSION"

# Copy and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle config set without 'development test' && \
    bundle config set path 'vendor/bundle' && \
    bundle install --jobs 4

# Copy full Rails app code
COPY . .

# Copy Angular build output into Rails public folder
COPY --from=frontend-build /app/frontend/dist/frontend/browser /app/public

# Set env vars and precompile Rails assets
ENV RAILS_ENV=production \
    NODE_ENV=production \
    RAILS_SERVE_STATIC_FILES=true \
    RAILS_LOG_TO_STDOUT=true \
    PATH="/app/vendor/bundle/bin:$PATH"

# Stage 3: Final runtime image
FROM ruby:3.3-slim

WORKDIR /app

# Install runtime dependencies only
RUN apt-get update && apt-get install -y \
    libpq-dev libyaml-dev \
 && rm -rf /var/lib/apt/lists/*

# Copy built app
COPY --from=rails-build /app /app

# Set environment
ENV RAILS_ENV=production \
    NODE_ENV=production \
    RAILS_SERVE_STATIC_FILES=true \
    RAILS_LOG_TO_STDOUT=true \
    BUNDLE_PATH="/app/vendor/bundle" \
    BUNDLE_WITHOUT="development:test" \
    PATH="/app/vendor/bundle/bin:$PATH"

EXPOSE 3000
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
