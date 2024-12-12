#!/bin/bash

# Clean previous builds
rm -rf dist server/dist

# Build the React app
echo "Building React app..."
npm run build


# Build the server
echo "Building server..."
npm run server:build

# Create public directory in server
mkdir -p server/dist/public

# Move React build artifacts to server/dist/public
mv dist/* server/dist/public/

# Move server build artifacts to dist
mv server/dist/* dist/

echo "Build complete! Server files are in server/dist and React files are in server/public"
