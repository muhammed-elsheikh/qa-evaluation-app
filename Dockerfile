# Multi-stage build for TypeScript React frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Create package.json for the TypeScript frontend
COPY package*.json* ./

# If no package.json exists, create a basic one
RUN if [ ! -f package.json ]; then \
    echo '{"name":"qdk-tool-frontend","version":"1.0.0","private":true,"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject"},"dependencies":{"react":"^18.2.0","react-dom":"^18.2.0","react-scripts":"5.0.1","@types/react":"^18.0.0","@types/react-dom":"^18.0.0","typescript":"^4.9.0","tailwindcss":"^3.3.0","autoprefixer":"^10.4.14","postcss":"^8.4.24"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}' > package.json; \
    fi

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src/
COPY public/ ./public/
COPY tailwind.config.js* ./
COPY postcss.config.js* ./
COPY tsconfig.json* ./

# Create tsconfig.json if it doesn't exist
RUN if [ ! -f tsconfig.json ]; then \
    echo '{"compilerOptions":{"target":"es5","lib":["dom","dom.iterable","es6"],"allowJs":true,"skipLibCheck":true,"esModuleInterop":true,"allowSyntheticDefaultImports":true,"strict":true,"forceConsistentCasingInFileNames":true,"module":"esnext","moduleResolution":"node","resolveJsonModule":true,"isolatedModules":true,"noEmit":true,"jsx":"react-jsx"},"include":["src"]}' > tsconfig.json; \
    fi

# Create public/index.html if it doesn't exist
RUN mkdir -p public && if [ ! -f public/index.html ]; then \
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><link rel="icon" href="%PUBLIC_URL%/favicon.ico"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="QDK Tool"/><title>QDK Tool</title></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>' > public/index.html; \
    fi

# Create App.css if it doesn't exist
RUN if [ ! -f src/App.css ]; then \
    echo '@tailwind base; @tailwind components; @tailwind utilities;' > src/App.css; \
    fi

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx-ts.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
